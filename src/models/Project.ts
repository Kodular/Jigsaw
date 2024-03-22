import dayjs from "dayjs";

export class Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;

  constructor(name: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.createdAt = dayjs().unix();
    this.updatedAt = dayjs().unix();
  }

  get path() {
    return `./JigsawProjects/${this.name}`;
  }

  static fromJson(data: any): Project {
    const project = new Project(data.name);
    project.id = data.id;
    project.createdAt = data.createdAt ?? project.createdAt;
    project.updatedAt = data.updatedAt ?? project.updatedAt;
    return project;
  }
}
