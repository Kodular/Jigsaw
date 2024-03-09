<script setup lang="ts">
import Card from 'primevue/card';
import {getProjects} from "./data/projects.ts";
import {useAsyncState} from "@vueuse/core";

const {state: projects, isLoading} = useAsyncState(getProjects, []);

</script>

<template>
  <p>Your Projects</p>
  <p v-if="isLoading">Loading...</p>
  <div v-else v-for="project in projects">
    <RouterLink :to="`/project/${project[0]}`">
      <Card>
        <template #title>{{ project[0] }}</template>
        <template #content>
          <p class="m-0">
            Project {{ project[1].name }}
          </p>
        </template>
      </Card>
    </RouterLink>
  </div>
</template>
