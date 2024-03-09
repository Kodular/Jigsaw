<script setup lang="ts">
import {useRoute} from "vue-router";
import {useAsyncState} from "@vueuse/core";
import {getProject} from "./data/projects.ts";
import Editor from "./Editor.vue";

const route = useRoute();

const {state: project, isLoading} = useAsyncState(() => getProject(route.params.id), null);

</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <Editor v-else :project/>
</template>

<style scoped>

</style>
