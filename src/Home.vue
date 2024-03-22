<script setup lang="ts">
import Card from 'primevue/card';
import {getProjects} from "./data/projects.ts";
import {useAsyncState} from "@vueuse/core";
import ButtonGroup from "primevue/buttongroup";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import {useDialog} from "primevue/usedialog";
import NewProjectDialog from "./components/NewProjectDialog.vue";
import dayjs from "dayjs";

const {state: projects, isLoading, execute: reloadProjects} = useAsyncState(getProjects, []);

const dialog = useDialog();

function openNewProjectDialog() {
  dialog.open(NewProjectDialog, {
    props: {
      header: 'Create a new projectf',
      modal: true
    },
    onClose(options) {
        reloadProjects();
    },
  })
}
</script>

<template>
  <Toolbar>
    <template #center>
      Your Projects
    </template>
    <template #end>
      <ButtonGroup>
        <Button>Import</Button>
        <Button @click="openNewProjectDialog">New</Button>
      </ButtonGroup>
    </template>
  </Toolbar>
  <p v-if="isLoading">Loading...</p>
  <div v-else>
    <div v-if="projects.length" v-for="project in projects" :key="project.id">
      <RouterLink :to="`/project/${project.id}`">
        <Card>
          <template #title>
            {{ project.name }}
          </template>
          <template #content>
            <div>
              <p>Created at {{ dayjs.unix(project.createdAt) }}</p>
              <p>Updated at {{ dayjs.unix(project.updatedAt) }}</p>
            </div>
          </template>
        </Card>
      </RouterLink>
    </div>
    <div v-else>
      No projects
    </div>
  </div>
</template>
