import dayjs from "dayjs";
import {BaseDirectory, remove} from "@tauri-apps/plugin-fs";
import {saveProjectById} from "../data/projects.ts";

export class Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  public workspaceState: object | undefined;

  constructor(name: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.createdAt = dayjs().unix();
    this.updatedAt = dayjs().unix();
  }

  get path() {
    return `./JigsawProjects/${this.name}`;
  }

  async save() {
    this.updatedAt = dayjs().unix();
    await saveProjectById(this.id, this);
  }

  async delete() {
    try {
      await remove(this.path, {baseDir: BaseDirectory.Home, recursive: true})
    } catch (e) {
      console.error("Failed to delete project directory", this.path);
    }
  }

  static fromJson(data: any): Project {
    const project = new Project(data.name);
    project.id = data.id;
    project.createdAt = data.createdAt ?? project.createdAt;
    project.updatedAt = data.updatedAt ?? project.updatedAt;
    project.workspaceState = data.workspaceState;
    return project;
  }
}
