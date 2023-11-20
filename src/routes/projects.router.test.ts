import { Router } from "express";
import request from "supertest";
import server from "../server";
import {
  DeleteProjectController,
  GetAllProjectsController,
  GetProjectByIdController,
  PostProjectController,
  PutProjectController,
} from "../controllers/projects.controller";
import { HTTPResponse, HTTPStatus } from "../http";
import {
  initDeleteProjectRouter,
  initGetAllProjectsRouter,
  initGetProjectByIdRouter,
  initPostProjectRouter,
  initPutProjectRouter,
} from "./projects.router";
import initExpressCallback from "../express/express-callback";

class MockPostProjectController extends PostProjectController {
  processRequest(): Promise<HTTPResponse> {
    throw new Error("Method not implemented.");
  }
}

class MockGetAllProjectsController extends GetAllProjectsController {
  processRequest(): Promise<HTTPResponse> {
    throw new Error("Method not implemented.");
  }
}

class MockGetProjectByIdController extends GetProjectByIdController {
  processRequest(): Promise<HTTPResponse> {
    throw new Error("Method not implemented.");
  }
}

class MockPutProjectController extends PutProjectController {
  processRequest(): Promise<HTTPResponse> {
    throw new Error("Method not implemented.");
  }
}

class MockDeleteProjectController extends DeleteProjectController {
  processRequest(): Promise<HTTPResponse> {
    throw new Error("Method not implemented.");
  }
}

const fakeResponse: HTTPResponse = {
  statusCode: HTTPStatus.OK,
  body: {},
  headers: {},
};

describe("Project Routers (Unit Tests)", () => {
  let router: Router;

  describe("[Router] Post Project", () => {
    let mockPostProjectController: PostProjectController;

    beforeEach(() => {
      jest.clearAllMocks();
      mockPostProjectController = new MockPostProjectController();
      router = initPostProjectRouter(
        initExpressCallback(mockPostProjectController)
      );
      server.use(router);
    });

    it("should execute request processor in PostProjectController", async () => {
      jest
        .spyOn(mockPostProjectController, "processRequest")
        .mockImplementation(() => Promise.resolve(fakeResponse));

      // Test that clear mocks is working
      expect(mockPostProjectController.processRequest).toBeCalledTimes(0);

      await request(server).post("/");

      expect(mockPostProjectController.processRequest).toBeCalledTimes(1);
    });
  });

  describe("[Router] Get All Projects", () => {
    let mockGetAllProjectsController: GetAllProjectsController;

    beforeEach(() => {
      jest.clearAllMocks();
      mockGetAllProjectsController = new MockGetAllProjectsController();
      router = initGetAllProjectsRouter(
        initExpressCallback(mockGetAllProjectsController)
      );
      server.use(router);
    });

    it("should execute request processor in GetAllProjectsController", async () => {
      jest
        .spyOn(mockGetAllProjectsController, "processRequest")
        .mockImplementation(() => Promise.resolve(fakeResponse));

      expect(mockGetAllProjectsController.processRequest).toBeCalledTimes(0);

      await request(server).get("/");

      expect(mockGetAllProjectsController.processRequest).toBeCalledTimes(1);
    });
  });

  describe("[Router] Get Project By Id", () => {
    let mockGetProjectByIdController: GetProjectByIdController;

    beforeEach(() => {
      jest.clearAllMocks();
      mockGetProjectByIdController = new MockGetProjectByIdController();
      router = initGetProjectByIdRouter(
        initExpressCallback(mockGetProjectByIdController)
      );
      server.use(router);
    });

    it("should execute request processor in GetProjectByIdController", async () => {
      jest
        .spyOn(mockGetProjectByIdController, "processRequest")
        .mockImplementation(() => Promise.resolve(fakeResponse));

      expect(mockGetProjectByIdController.processRequest).toBeCalledTimes(0);

      await request(server).get("/id");

      expect(mockGetProjectByIdController.processRequest).toBeCalledTimes(1);
    });
  });

  describe("[Router] Put Project", () => {
    let mockPutProjectController: PutProjectController;

    beforeEach(() => {
      jest.clearAllMocks();
      mockPutProjectController = new MockPutProjectController();
      router = initPutProjectRouter(
        initExpressCallback(mockPutProjectController)
      );
      server.use(router);
    });

    it("should execute request processor in PutProjectController", async () => {
      jest
        .spyOn(mockPutProjectController, "processRequest")
        .mockImplementation(() => Promise.resolve(fakeResponse));

      expect(mockPutProjectController.processRequest).toBeCalledTimes(0);

      await request(server).put("/id");

      expect(mockPutProjectController.processRequest).toBeCalledTimes(1);
    });
  });

  describe("[Router] Delete Project", () => {
    let mockDeleteProjectController: DeleteProjectController;

    beforeEach(() => {
      jest.clearAllMocks();
      mockDeleteProjectController = new MockDeleteProjectController();
      router = initDeleteProjectRouter(
        initExpressCallback(mockDeleteProjectController)
      );
      server.use(router);
    });

    it("should execute request processor in DeleteProjectController", async () => {
      jest
        .spyOn(mockDeleteProjectController, "processRequest")
        .mockImplementation(() => Promise.resolve(fakeResponse));

      expect(mockDeleteProjectController.processRequest).toBeCalledTimes(0);

      await request(server).delete("/id");

      expect(mockDeleteProjectController.processRequest).toBeCalledTimes(1);
    });
  });
});
