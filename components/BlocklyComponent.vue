<script setup>
import { onMounted, ref, shallowRef } from "vue";
import Blockly from "blockly";

const props = defineProps(["options"]);
const blocklyToolbox = ref();
const blocklyDiv = ref();
const workspace = shallowRef();

defineExpose({ workspace });

onMounted(() => {
  const options = props.options || {};
  if (!options.toolbox) {
    options.toolbox = blocklyToolbox.value;
  }
  workspace.value = Blockly.inject(blocklyDiv.value, options);
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
