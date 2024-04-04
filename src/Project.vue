<script setup lang="ts">
import {useRoute} from "vue-router";
import {useAsyncState} from "@vueuse/core";
import {getProjectById} from "./data/projects.ts";
import Editor from "./Editor.vue";

const route = useRoute();

const {state: project, isLoading} = useAsyncState(() => getProjectById(route.params.id as string), null);

</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <Editor v-else :project/>
</template>

<style scoped>

</style>
