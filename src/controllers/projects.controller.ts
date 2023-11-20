import { Project } from "../entities/Project";
import { HTTPRequest, HTTPResponse, HTTPStatus } from "../http";
import {
  CreateProjectUseCase,
  DeleteProjectUseCase,
  FindProjectUseCase,
  GetProjectsUseCase,
  UpdateProjectUseCase,
} from "../use-cases/projects.use-case";
import { HTTPController } from "./HTTPController";

export class PostProjectController implements HTTPController {
  private _createProject: CreateProjectUseCase;

  constructor(createProject = new CreateProjectUseCase()) {
    this._createProject = createProject;
  }

  async processRequest(
    request: Pick<HTTPRequest, "body">
  ): Promise<HTTPResponse> {
    const { title, description, ownerId } = request.body;
    const project = await this._createProject.execute({
      title,
      description,
      ownerId,
    });

    return {
      statusCode: HTTPStatus.Created,
      body: project,
      headers: {
        "Content-Type": "application/json",
        "Last-Modified": new Date(project.timeUpdated).toUTCString(),
      },
    };
  }
}

export class GetAllProjectsController implements HTTPController {
  private _getProjects: GetProjectsUseCase;

  constructor(getProjects = new GetProjectsUseCase()) {
    this._getProjects = getProjects;
  }

  async processRequest(): Promise<HTTPResponse> {
    const projects = await this._getProjects.execute();

    return {
      statusCode: HTTPStatus.OK,
      body: projects,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
}

export class GetProjectByIdController implements HTTPController {
  private _findProject: FindProjectUseCase;

  constructor(fincProject = new FindProjectUseCase()) {
    this._findProject = fincProject;
  }

  async processRequest(
    request: Pick<HTTPRequest, "params">
  ): Promise<HTTPResponse> {
    const { id } = request.params;

    try {
      const project = await this._findProject.execute(id);

      return {
        statusCode: HTTPStatus.OK,
        body: project,
        headers: {
          "Content-Type": "application/json",
        },
      };
    } catch (err) {
      return {
        statusCode: HTTPStatus.NotFound,
        body: {
          message: (err as Error).message,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  }
}

export class PutProjectController implements HTTPController {
  private _updateProject: UpdateProjectUseCase;

  constructor(updateProject = new UpdateProjectUseCase()) {
    this._updateProject = updateProject;
  }

  async processRequest(
    request: Pick<HTTPRequest, "params" | "body">
  ): Promise<HTTPResponse> {
    const { id } = request.params;
    const { title, description, ownerId } = request.body;

    const project = await this._updateProject.execute({
      id,
      title,
      description,
      ownerId,
    });

    if (project.timeCreated === project.timeUpdated) {
      return {
        statusCode: HTTPStatus.Created,
        body: project,
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(project.timeUpdated).toUTCString(),
        },
      };
    } else {
      return {
        statusCode: HTTPStatus.OK,
        body: project,
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(project.timeUpdated).toUTCString(),
        },
      };
    }
  }
}

export class DeleteProjectController implements HTTPController {
  private _deleteProject: DeleteProjectUseCase;

  constructor(deleteProject = new DeleteProjectUseCase()) {
    this._deleteProject = deleteProject;
  }

  async processRequest(
    request: Pick<HTTPRequest, "params">
  ): Promise<HTTPResponse> {
    const { id } = request.params;

    try {
      const project = await this._deleteProject.execute(id);

      return {
        statusCode: HTTPStatus.OK,
        body: project as Project,
        headers: {
          "Content-Type": "application/json",
        },
      };
    } catch (err) {
      return {
        statusCode: HTTPStatus.NotFound,
        body: {
          message: (err as Error).message,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  }
}
