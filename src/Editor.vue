<template>
  <div style="height:calc(100vh - 40px);">
    <Toolbar>
      <template #start>
        <Button @click="$router.back()" title="Back to projects">
          <template #icon>
            <TablerArrowLeft/>
          </template>
        </Button>
      </template>

      <template #center>
        {{ project.name }}
      </template>

      <template #end>
        <div style="display: flex; gap: 0.5rem;">
          <Button title="Build project">
            <template #icon>
              <TablerTools/>
            </template>
          </Button>

          <Button @click="stopPreview" title="Stop preview" severity="danger" v-if="isPreviewing">
            <template #icon>
              <TablerEyeClosed/>
            </template>
          </Button>
          <Button @click="startPreview" title="Preview app" v-else>
            <template #icon>
              <TablerEye/>
            </template>
          </Button>

          <Button @click="saveCode" title="Save project">
            <template #icon>
              <TablerDeviceFloppy/>
            </template>
          </Button>
        </div>
      </template>
    </Toolbar>
    <!--    <Splitter style="height: 100%;">-->
    <!--      <SplitterPanel :size="60">-->
    <BlocklyComponent :options="options" ref="blocklyEl"/>
    <!--      </SplitterPanel>-->

    <!--      <SplitterPanel :size="40">-->
    <!--        <DevicePreview /> -->
    <!--        <LivePreview />-->
    <!--      </SplitterPanel>-->
    <!--    </Splitter>-->
  </div>
</template>

<script lang="ts" setup>
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import BlocklyComponent from "./components/BlocklyComponent.vue";
import toolbox from "./blocks/toolbox.ts";
import "./blocks/jigsaw.ts";
import * as Blockly from "blockly";
//@ts-ignore
import DarkTheme from '@blockly/theme-dark';
import {generateAppCode} from "./blocks/codegen.ts";
import {onMounted, onUnmounted, ref} from "vue";
import {runPreviewService} from "./services/preview.ts";
import TablerArrowLeft from '~icons/tabler/arrow-left'
import TablerTools from '~icons/tabler/tools'
import TablerEye from '~icons/tabler/eye'
import TablerEyeClosed from '~icons/tabler/eye-closed'
import TablerDeviceFloppy from '~icons/tabler/device-floppy'
import {useDark} from "@vueuse/core";
import {Project} from "./models/Project.ts";

const props = defineProps<{
  project: Project
}>();

const project = props.project;

const isDark = useDark()

const options = {
  // media: "media/",
  grid: {
    spacing: 25,
    length: 3,
    colour: "#ccc",
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },
  renderer: 'thrasos',
  theme: isDark ? DarkTheme : 'zelos',
  toolbox
};

// Events that should trigger the auto-save procedure.
const blockEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
]);

const blocklyEl = ref<typeof BlocklyComponent | null>(null);
const isPreviewing = ref(false)
const previewAbortController = ref<AbortController | null>(null);

async function saveCode() {
  if (project && blocklyEl.value?.workspace) {
    await generateAppCode(project.name, blocklyEl.value.workspace);
  }
}

function startPreview() {
  const ac = new AbortController();
  runPreviewService(project, ac, () => isPreviewing.value = false);
  previewAbortController.value = ac;
  isPreviewing.value = true;
}

function stopPreview() {
  previewAbortController.value?.abort();
  isPreviewing.value = false;
}

onMounted(() => {
  const workspace = blocklyEl.value?.workspace;
  const state = project.workspaceState;
  if (state) {
    Blockly.serialization.workspaces.load(state, workspace);
  }

  workspace.addChangeListener((event: Blockly.Events.Abstract) => {
    if (!blockEvents.has(event.type)) {
      return;
    }
    if (workspace.isDragging()) return; // Don't update while changes are happening.

    saveCode().then(() => {
    });

    project.workspaceState = Blockly.serialization.workspaces.save(workspace);
    project.save();
  });
});

onUnmounted(async () => {
  stopPreview();
  await saveCode();
  blocklyEl.value?.workspace.dispose();
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
}
</style>
