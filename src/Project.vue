<script setup lang="ts">
import {useRoute} from "vue-router";
import {useAsyncState} from "@vueuse/core";
import {getProjectById} from "./data/projects.ts";
import Editor from "./Editor.vue";
import ProgressSpinner from "primevue/progressspinner";

const route = useRoute();

const {state: project, isLoading} = useAsyncState(() => getProjectById(route.params.id as string), null);

</script>

<template>
  <template v-if="isLoading">
    <ProgressSpinner />
  </template>
  <Editor v-else-if="project" :project/>
  <template v-else>
    Fatal error! project is null
  </template>
</template>
