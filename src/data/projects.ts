import {Store} from "@tauri-apps/plugin-store";
import {Project} from "../models/Project.ts";

const projectsStore = new Store("projects");
try {
    await projectsStore.load();
} catch (e) {
    console.error("Failed to load store from disk", e);
}

export async function getProjects() {
    const rawProjects = await projectsStore.values();
    return rawProjects.map((projectData) => Project.fromJson(projectData))
}

export async function getProjectById(id: string) {
    return Project.fromJson(await projectsStore.get(id));
}

export async function saveProjectById(id: string, projectData: Project) {
    console.log('project data', projectData);
    await projectsStore.set(id, projectData);
    await projectsStore.save();
}

export async function deleteProjectById(id: string) {
    const project = await getProjectById(id);
    await project.delete();
    await projectsStore.delete(id);
    await projectsStore.save();
}
