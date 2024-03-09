import {Store} from "tauri-plugin-store-api";

const projectsStore = new Store("projects");
try {
  await projectsStore.load();
} catch (e) {
  console.error("Failed to load store from disk", e);
}
console.log('projects', await getProjects());


export function getProjects() {
  return projectsStore.entries();
}

export function getProject(id: string) {
  return projectsStore.get(id);
}

export async function saveProject(id: string, projectData: any) {
  await projectsStore.set(id, projectData);
}
