<script setup lang="ts">
import {ref} from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import {Project} from "../models/Project.ts";

const modelValue = defineModel<boolean>({required: true})
const emit = defineEmits(['created'])

const projectName = ref('')

async function onCreate() {
  const newProject = new Project(projectName.value);
  await newProject.save();

  modelValue.value = false;

  emit('created')
}
</script>

<template>
  <Dialog v-model:visible="modelValue" modal header="Create a new project">
    <div class="flex align-items-center gap-3 mb-3">
      <label for="project_name" class="font-semibold w-6rem">Project name</label>
      <InputText id="project_name" class="flex-auto" autocomplete="off" v-model="projectName"/>
    </div>
    <template #footer>
      <Button type="button" label="Cancel" severity="secondary" @click="modelValue = false"></Button>
      <Button type="button" label="Save" @click="onCreate"></Button>
    </template>
  </Dialog>
</template>

<style scoped>

</style>