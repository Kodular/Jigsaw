<script setup lang="ts">
import Card from 'primevue/card';
import {getProjects} from "./data/projects.ts";
import {useAsyncState} from "@vueuse/core";

const {state: projects, isLoading} = useAsyncState(getProjects, []);

</script>

<template>
  <p>Your Projects</p>
  <p v-if="isLoading">Loading...</p>
  <div v-else v-for="[projectId, project] in projects">
    <RouterLink :to="`/project/${projectId}`">
      <Card>
        <template #title>{{ projectId }}</template>
        <template #content>
          <p class="m-0">
            Project {{ (project as any)?.name }}
          </p>
        </template>
      </Card>
    </RouterLink>
  </div>
</template>
