<script setup>
import {onMounted, ref, shallowRef} from "vue";
import * as Blockly from "blockly";
// import {LexicalVariablesPlugin} from '@mit-app-inventor/blockly-block-lexical-variables';
import {ElMessage, ElMessageBox} from 'element-plus'
import 'element-plus/dist/index.css'

const props = defineProps(["options"]);
const blocklyDiv = ref();
const workspace = shallowRef();

defineExpose({workspace});

Blockly.dialog.setAlert((title, callback) => {
  ElMessageBox.alert(title, 'Blockly')
      .then(() => callback())
})

Blockly.dialog.setConfirm((title, callback) => {
  ElMessageBox.confirm(title, 'Blockly')
      .then(() => callback(true))
      .catch(() => callback(false))
})

Blockly.dialog.setPrompt((title, defaultValue, callback) => {
  ElMessageBox.prompt(title, 'Blockly')
      .then(({value}) => callback(value ?? defaultValue))
})

onMounted(() => {
  const ws = Blockly.inject(blocklyDiv.value, props.options);
  // LexicalVariablesPlugin.init(ws);

  workspace.value = ws;
});
</script>

<template>
  <div class="blocklyDiv" ref="blocklyDiv"></div>
</template>

<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
