import {Store} from "@tauri-apps/plugin-store";
import {Project} from "../models/Project.ts";
import dayjs from "dayjs";

const projectsStore = new Store("projects");
try {
  await projectsStore.load();
} catch (e) {
  console.error("Failed to load store from disk", e);
}
console.log('projects', await getProjects());


export async function getProjects() {
  const rawProjects = await projectsStore.values();
  return rawProjects.map((projectData) => Project.fromJson(projectData))
}

export function getProject(id: string) {
  return projectsStore.get(id);
}

export async function saveProject(id: string, projectData: Project) {
  projectData.updatedAt = dayjs().unix();

  await projectsStore.set(id, projectData);
}

export async function createProject(projectName: string) {
  const newProject = new Project(projectName);

  await saveProject(newProject.id, newProject)
}
