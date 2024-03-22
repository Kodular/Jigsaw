<script setup lang="ts">
import {inject, Ref, ref} from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {createProject} from "../data/projects.ts";
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'

const emit = defineEmits(['onCancel'])

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef');

const projectName = ref('')

async function onCreate() {
  await createProject(projectName.value);

  closeDialog();
}

function closeDialog() {
  dialogRef?.value.close();
}
</script>

<template>
  <div class="flex align-items-center gap-3 mb-3">
    <label for="project_name" class="font-semibold w-6rem">Project name</label>
    <InputText id="project_name" class="flex-auto" autocomplete="off" v-model="projectName" />
  </div>
  <div class="flex justify-content-end gap-2">
    <Button type="button" label="Cancel" severity="secondary" @click="closeDialog"></Button>
    <Button type="button" label="Save" @click="onCreate"></Button>
  </div>
</template>

<style scoped>

</style>