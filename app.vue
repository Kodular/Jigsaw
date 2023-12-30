<script setup>

import toolbox from "./blocks/toolbox";
import "./blocks/jigsaw";
import * as Blockly from "blockly";
import { generateAppCode } from "./blocks/codegen";


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


let initCode = `<script type="module">
import {createSignal,onCleanup,} from "https://cdn.skypack.dev/solid-js";
import { render } from "https://cdn.skypack.dev/solid-js/web";
import h from "https://cdn.skypack.dev/solid-js/h";

const App = () => {
    const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount(count() + 1), 1000);
    onCleanup(() => clearInterval(timer));
    return h("div", {}, count);
};

render(App, document.body);
<\/script>\n`

let code = ref(initCode);
const blocklyEl = ref();
const toggleOutput = ref(true);

const showCode = () => {
  code.value = generateAppCode(blocklyEl.value.workspace);
}

onMounted(() => {
  const workspace = blocklyEl.value.workspace;
  const STATE_KEY = "workspace-state";

  const state = JSON.parse(localStorage.getItem(STATE_KEY));
  if (state) {
    Blockly.serialization.workspaces.load(state, workspace);
  }

  workspace.addChangeListener(() => {
    if (workspace.isDragging()) return; // Don't update while changes are happening.

    showCode();

    let state = Blockly.serialization.workspaces.save(workspace);
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  });
});



</script>

<template>
  <div>
    <div class="half">
      <BlocklyComponent :options="options" ref="blocklyEl" />
    </div>

    <div class="half">
      <button @click="toggleOutput = !toggleOutput">Toggle Output</button>
      <pre v-if="toggleOutput">{{ code }}</pre>
      <iframe :srcdoc="code" style="width: 100%; height: 100%" v-else></iframe>
    </div>
  </div>
</template>

<style>
div:has(.half) {
  display: flex;
}

.half {
  width: 50dvw;
  height: 100dvh;
  border: 1px solid black;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
./blocks/codegen