export class Project {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = crypto.randomUUID();
    this.name = name;
  }

  get path() {
    return `./JigsawProjects/${this.name}`;
  }
}
