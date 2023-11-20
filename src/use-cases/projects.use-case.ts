import { Project, createNewProject } from "../entities/Project";
import { InMemoryProjectRepository } from "../repositories/projects.repository";
import { UseCase } from "./UseCase";

const db = new InMemoryProjectRepository();

export class CreateProjectUseCase implements UseCase<Project> {
  private _projectRepo;

  constructor(projectRepo = db) {
    this._projectRepo = projectRepo;
  }

  async execute(payload: Partial<Project>): Promise<Project> {
    const project = createNewProject(payload);

    await this._projectRepo.insert(project);
    return project;
  }
}

export class GetProjectsUseCase implements UseCase<Project[]> {
  private _projectRepo;

  constructor(projectRepo = db) {
    this._projectRepo = projectRepo;
  }

  async execute(): Promise<Project[]> {
    const projects = await this._projectRepo.getAll();

    return projects;
  }
}

export class FindProjectUseCase implements UseCase<Project> {
  private _projectRepo;

  constructor(projectRepo = db) {
    this._projectRepo = projectRepo;
  }

  async execute(id: string): Promise<Project> {
    try {
      const project = await this._projectRepo.getById(id);

      return project;
    } catch (err) {
      throw err as Error;
    }
  }
}

export class UpdateProjectUseCase implements UseCase<Project> {
  private _projectRepo;

  constructor(projectRepo = db) {
    this._projectRepo = projectRepo;
  }

  async execute({
    id,
    title,
    description,
    ownerId,
    members,
    issues,
  }: {
    id: string;
    title?: string;
    description?: string;
    ownerId?: string | null;
    members?: [];
    issues?: [];
  }): Promise<Project> {
    const updatedProject = await this._projectRepo.update(id, {
      title,
      description,
      ownerId,
      members,
      issues,
    });

    return updatedProject;
  }
}

export class DeleteProjectUseCase implements UseCase<Project> {
  private _projectRepo;

  constructor(projectRepo = db) {
    this._projectRepo = projectRepo;
  }

  async execute(id: string): Promise<Project> {
    const project = await this._projectRepo.delete(id);

    return project;
  }
}
