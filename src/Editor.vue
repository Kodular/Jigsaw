<template>
  <div style="height:calc(100vh - 40px);">
    <Toolbar>
      <template #start>
        <Button @click="$router.back()">Go back</Button>
      </template>

      <template #center>
        <InputText placeholder="Search" />
      </template>

      <template #end>
        <span class="p-buttonset">
          <Button>Build</Button>
          <Button>Preview</Button>
        </span>
      </template>
    </Toolbar>
    <Splitter style="height: 100%;">
      <SplitterPanel :size="60">
        <BlocklyComponent :options="options" ref="blocklyEl" />
      </SplitterPanel>

      <SplitterPanel :size="40">
        <!-- <DevicePreview /> -->
        <LivePreview />
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script lang="ts" setup>
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import BlocklyComponent from "./components/BlocklyComponent.vue";
import DevicePreview from "./components/DevicePreview.vue";

import toolbox from "./blocks/toolbox";
import "./blocks/jigsaw";
import * as Blockly from "blockly";
import { generateAppCode } from "./blocks/codegen";
import { ref, onMounted } from "vue";
import LivePreview from './components/LivePreview.vue';


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

let code = ref({});
const blocklyEl = ref<typeof BlocklyComponent | null>(null);

const showCode = async () => {
  if (!blocklyEl.value || !blocklyEl.value.workspace) {
    code.value = {};
  } else {
    code.value = await generateAppCode(blocklyEl.value.workspace);
  }
}

onMounted(() => {
  const workspace = blocklyEl.value.workspace;
  const STATE_KEY = "workspace-state";

  const state = JSON.parse(localStorage.getItem(STATE_KEY) as string);
  if (state) {
    Blockly.serialization.workspaces.load(state, workspace);
  }

  workspace.addChangeListener(() => {
    if (workspace.isDragging()) return; // Don't update while changes are happening.

    showCode().then(() => { });

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