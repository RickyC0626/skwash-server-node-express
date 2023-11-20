import {
  Project,
  createNewProject,
  getUpdatedProject,
} from "../entities/Project";
import { ProjectRepository } from "./ProjectRepository";

export class InMemoryProjectRepository implements ProjectRepository {
  private _db;

  constructor(db = new Map<string, Project>()) {
    this._db = db;
  }

  async getAll(): Promise<Project[]> {
    return Array.from(this._db.values());
  }

  async getById(id: string): Promise<Project> {
    const project = this._db.get(id);

    if (!project)
      throw new Error(`Project with id '${id}' not found in database!`);

    return project;
  }

  async insert(item: Project): Promise<boolean> {
    this._db.set(item.id, item);
    return true;
  }

  async update(id: string, replacement: Partial<Project>): Promise<Project> {
    // If project exists, replace contents
    if (this._db.has(id)) {
      const project = this._db.get(id);
      const updated = getUpdatedProject(project as Project, replacement);

      this._db.set(project!.id, updated);
      return updated;
    }
    // Otherwise, create a new project with contents
    else {
      const project = createNewProject(replacement);

      this._db.set(project.id, project);
      return project;
    }
  }

  async delete(id: string): Promise<Project> {
    const project = this._db.get(id);

    if (!project)
      throw new Error(`Project with id '${id}' not found in database!`);

    this._db.delete(id);
    return project;
  }
}
