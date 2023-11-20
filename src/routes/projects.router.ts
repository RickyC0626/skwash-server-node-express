import express, { Router } from "express";
import {
  PostProjectController,
  GetAllProjectsController,
  GetProjectByIdController,
  PutProjectController,
  DeleteProjectController,
} from "../controllers/projects.controller";
import initExpressCallback from "../express/express-callback";

export const initPostProjectRouter = (
  postProject = initExpressCallback(new PostProjectController())
): Router => {
  const router = express.Router();

  /**
   * POST /projects
   *
   * Request body:
   * - title: string
   * - description: string
   * - ownerId: UUIDv4 / string
   *
   * Returns: the newly created project
   *
   * Return status:
   * 201 Created: new project created and added to database
   */
  router.post("/", postProject);

  return router;
};

export const initGetAllProjectsRouter = (
  getAllProjects = initExpressCallback(new GetAllProjectsController())
): Router => {
  const router = express.Router();

  /**
   * GET /projects
   *
   * No request body
   *
   * Returns: list of all available projects (paginated by 20 items)
   *
   * Return status:
   * 200 OK: all projects successfully returned, even if none available
   */
  router.get("/", getAllProjects);

  return router;
};

export const initGetProjectByIdRouter = (
  getProjectById = initExpressCallback(new GetProjectByIdController())
): Router => {
  const router = express.Router();

  /**
   * GET /projects/:id
   *
   * No request body, id in params
   *
   * Returns: the project associated with the id, if found
   *
   * Return status:
   * 200 OK: the project associated with the id
   * 404 Not Found: project id not found in database
   */
  router.get("/:id", getProjectById);

  return router;
};

export const initPutProjectRouter = (
  putProject = initExpressCallback(new PutProjectController())
): Router => {
  const router = express.Router();

  /**
   * PUT /projects/:id
   *
   * Request body:
   * - title: string
   * - description: string
   * - ownerId: UUIDv4 / string
   *
   * Returns: the updated project, or newly created project if one doesn't exist
   *
   * Return status:
   * 200 OK: the project has been modified
   * 201 Created: the project does not exist, created new one
   */
  router.put("/:id", putProject);

  return router;
};

export const initDeleteProjectRouter = (
  deleteProject = initExpressCallback(new DeleteProjectController())
): Router => {
  const router = express.Router();

  /**
   * DELETE /projects/:id
   *
   * No request body, id in params
   *
   * Returns: the deleted project, or a message stating that the project
   * associated with the id does not exist
   *
   * Return status:
   * 200 OK: the project associated with the id has been deleted
   * 404 Not Found: project id not found in database
   */
  router.delete("/:id", deleteProject);

  return router;
};

export default function initProjectRouter() {
  const router = express.Router();

  router.use([
    initPostProjectRouter(),
    initGetAllProjectsRouter(),
    initGetProjectByIdRouter(),
    initPutProjectRouter(),
    initDeleteProjectRouter(),
  ]);

  return router;
}
