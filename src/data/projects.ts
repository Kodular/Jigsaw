import {Store} from "@tauri-apps/plugin-store";
import {Project} from "../models/Project.ts";
import dayjs from "dayjs";
import {BaseDirectory, remove} from "@tauri-apps/plugin-fs";

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

export function getProjectById(id: string) {
    return projectsStore.get(id);
}

export async function saveProjectById(id: string, projectData: Project) {
    projectData.updatedAt = dayjs().unix();

    await projectsStore.set(id, projectData);
    await projectsStore.save()
}

export async function createProject(projectName: string) {
    const newProject = new Project(projectName);

    await saveProjectById(newProject.id, newProject)
}

export async function deleteProjectById(id: string) {
    const project = Project.fromJson(await getProjectById(id))
    await remove(project.path, {baseDir: BaseDirectory.Home, recursive: true})
    await projectsStore.delete(id);
    await projectsStore.save();
}
