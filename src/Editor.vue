<template>
  <div style="height:calc(100vh - 40px);">
    <Toolbar>
      <template #start>
        <Button @click="$router.back()">Back to Projects</Button>
      </template>

      <template #center>
        {{ project?.name }}
      </template>

      <template #end>
        <ButtonGroup>
          <Button>Build</Button>
          <Button @click="startPreview">Preview</Button>
          <Button @click="saveCode">Save</Button>
        </ButtonGroup>
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
import ButtonGroup from 'primevue/buttongroup';
import BlocklyComponent from "./components/BlocklyComponent.vue";
import toolbox from "./blocks/toolbox.ts";
import "./blocks/jigsaw.ts";
import * as Blockly from "blockly";
import {generateAppCode} from "./blocks/codegen.ts";
import {onMounted, ref} from "vue";
import {runPreviewCommand} from "./commands/preview.ts";

const props = defineProps<{
  project: any
}>();

const project = props.project;

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
  theme: 'zelos',
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

async function saveCode() {
  if (project && blocklyEl.value?.workspace) {
    await generateAppCode(project.name, blocklyEl.value.workspace);
  }
}

function startPreview() {
  runPreviewCommand(project)
}

onMounted(() => {
  const workspace = blocklyEl.value?.workspace;
  const STATE_KEY = "workspace-state";

  const state = JSON.parse(localStorage.getItem(STATE_KEY) as string);
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

    let state = Blockly.serialization.workspaces.save(workspace);
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  });
});
</script>

<style>
html {
  font-size: 10px;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
}
</style>
