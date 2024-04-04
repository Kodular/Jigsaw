<script setup lang="ts">
import Card from 'primevue/card';
import {deleteProjectById, getProjectById, getProjects} from "./data/projects.ts";
import {useAsyncState} from "@vueuse/core";
import ButtonGroup from "primevue/buttongroup";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import DataView from "primevue/dataview";
import ProgressSpinner from 'primevue/progressspinner';
import {useDialog} from "primevue/usedialog";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import NewProjectDialog from "./components/NewProjectDialog.vue";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime"
import TablerUpload from '~icons/tabler/upload'
import TablerPlus from '~icons/tabler/plus'
import {open} from '@tauri-apps/plugin-shell'
import {homeDir, join} from "@tauri-apps/api/path";

dayjs.extend(RelativeTime);

const {state: projects, isLoading, execute: reloadProjects} = useAsyncState(getProjects, []);

const dialog = useDialog();
const confirm = useConfirm();
const toast = useToast();

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

async function showInFolderAction(projectId: string) {
  const project = await getProjectById(projectId);
  let path = await join(await homeDir(), project.path);
  await open(path)
}

function deleteProjectAction(projectId: string) {
  confirm.require({
    message: 'Do you want to delete this project?',
    header: 'Delete project',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: async () => {
      await deleteProjectById(projectId);
      await reloadProjects();
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Project deleted', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You chose not to delete the project', life: 3000 });
    }
  });
}
</script>

<template>
  <Toolbar>
    <template #center>
      Your Projects
    </template>
    <template #end>
      <ButtonGroup>
        <Button title="Import project">
          <template #icon>
            <TablerUpload/>
          </template>
        </Button>
        <Button @click="openNewProjectDialog" title="Create a new project">
          <template #icon>
            <TablerPlus/>
          </template>
        </Button>
      </ButtonGroup>
    </template>
  </Toolbar>
  <template v-if="isLoading">
    <ProgressSpinner/>
  </template>
  <template v-else-if="projects.length">
    <DataView :value="projects" data-key="id">
      <template #list="{items}">
        <template v-for="project in items" :key="project.id">
          <Card style="width: 300px;">
            <template #title>
              {{ project.name }}
            </template>
            <template #subtitle>
              Created {{ dayjs.unix(project.createdAt).fromNow() }}
              &bullet;
              Updated {{ dayjs.unix(project.updatedAt).fromNow() }}
            </template>
            <template #footer>
              <RouterLink :to="`/project/${project.id}`">
                <Button>Open</Button>
              </RouterLink>
              <Button severity="info" outlined @click="showInFolderAction(project.id)">
                Show in folder
              </Button>
              <Button outlined severity="danger" @click="deleteProjectAction(project.id)">
                Delete
              </Button>
            </template>
          </Card>
        </template>
      </template>
    </DataView>
  </template>
  <div v-else>
    No projects
  </div>
</template>
