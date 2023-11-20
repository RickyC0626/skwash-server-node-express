import { HTTPStatus } from "../http";
import { InMemoryProjectRepository } from "../repositories/projects.repository";
import { UpdateProjectUseCase } from "../use-cases/projects.use-case";
import {
  DeleteProjectController,
  GetAllProjectsController,
  GetProjectByIdController,
  PostProjectController,
  PutProjectController,
} from "./projects.controller";

describe("Project Controllers (Integration Tests)", () => {
  describe("Post Project", () => {
    let postProjectController: PostProjectController;

    beforeEach(() => {
      postProjectController = new PostProjectController();
    });

    describe("successful response", () => {
      const request = { body: {} };

      it("should have status code '201 Created'", async () => {
        const response = await postProjectController.processRequest(request);

        expect(response.statusCode).toBe(HTTPStatus.Created);
      });

      it("should have header 'Content-Type' set to 'application/json'", async () => {
        const response = await postProjectController.processRequest(request);

        expect(response.headers["Content-Type"]).toBeDefined();
        expect(response.headers["Content-Type"]).toBe("application/json");
      });

      it("should have header 'Last-Modified'", async () => {
        const response = await postProjectController.processRequest(request);

        expect(response.headers["Last-Modified"]).toBeDefined();
      });

      it("should have a non-empty body", async () => {
        const response = await postProjectController.processRequest(request);

        expect(Object.keys(response.body).length).toBeGreaterThan(0);
      });
    });
  });

  describe("Get All Projects", () => {
    let getAllProjectsController: GetAllProjectsController;

    beforeEach(() => {
      getAllProjectsController = new GetAllProjectsController();
    });

    describe("successful response", () => {
      it("should have status code '200 OK'", async () => {
        const response = await getAllProjectsController.processRequest();

        expect(response.statusCode).toBe(HTTPStatus.OK);
      });

      it("should have header 'Content-Type' set to 'application/json'", async () => {
        const response = await getAllProjectsController.processRequest();

        expect(response.headers["Content-Type"]).toBeDefined();
        expect(response.headers["Content-Type"]).toBe("application/json");
      });
    });
  });

  describe("Get Project By Id", () => {
    let getProjectByIdController: GetProjectByIdController;

    beforeEach(() => {
      getProjectByIdController = new GetProjectByIdController();
    });

    describe("if project is found", () => {
      const request = {
        params: { id: "" },
      };

      it.todo("should have status code '200 OK'");

      it("should have header 'Content-Type' set to 'application/json'", async () => {
        const response = await getProjectByIdController.processRequest(request);

        expect(response.headers["Content-Type"]).toBeDefined();
        expect(response.headers["Content-Type"]).toBe("application/json");
      });
    });

    describe("if project is not found", () => {
      const request = {
        params: { id: "" },
      };

      it("should have status code '404 Not Found", async () => {
        const response = await getProjectByIdController.processRequest(request);

        expect(response.statusCode).toBe(HTTPStatus.NotFound);
      });

      it("should have header 'Content-Type' set to 'application/json'", async () => {
        const response = await getProjectByIdController.processRequest(request);

        expect(response.headers["Content-Type"]).toBeDefined();
        expect(response.headers["Content-Type"]).toBe("application/json");
      });
    });
  });

  describe("Put Project", () => {
    let putProjectController: PutProjectController;

    beforeEach(() => {
      const inMemoryProjectRepo = new InMemoryProjectRepository(
        new Map([
          [
            "e4d0b15f-6d61-43d3-8126-778d970f8574",
            {
              id: "e4d0b15f-6d61-43d3-8126-778d970f8574",
              title: "Random Project",
              ownerId: null,
              timeCreated: 0,
              timeUpdated: 0,
              members: [],
              issues: [],
            },
          ],
        ])
      );
      const updateProjectUseCase = new UpdateProjectUseCase(
        inMemoryProjectRepo
      );
      putProjectController = new PutProjectController(updateProjectUseCase);
    });

    describe("if project does not exist, create new one", () => {
      const request = {
        params: {},
        body: {},
      };

      it("should have status code '201 Created'", async () => {
        const response = await putProjectController.processRequest(request);

        expect(response.statusCode).toBe(HTTPStatus.Created);
      });

      it("should have header 'Content-Type' set to 'application/json'", async () => {
        const response = await putProjectController.processRequest(request);

        expect(response.headers["Content-Type"]).toBeDefined();
        expect(response.headers["Content-Type"]).toBe("application/json");
      });

      it("should have header 'Last-Modified'", async () => {
        const response = await putProjectController.processRequest(request);

        expect(response.headers["Last-Modified"]).toBeDefined();
      });
    });

    describe("if project exists, update it", () => {
      const request = {
        params: {
          id: "e4d0b15f-6d61-43d3-8126-778d970f8574",
        },
        body: {
          title: "New Title",
        },
      };

      it("should have status code '200 OK'", async () => {
        const response = await putProjectController.processRequest(request);

        expect(response.statusCode).toBe(HTTPStatus.OK);
      });

      it("should have header 'Content-Type' set to 'application/json'", async () => {
        const response = await putProjectController.processRequest(request);

        expect(response.headers["Content-Type"]).toBeDefined();
        expect(response.headers["Content-Type"]).toBe("application/json");
      });

      it("should have header 'Last-Modified'", async () => {
        const response = await putProjectController.processRequest(request);

        expect(response.headers["Last-Modified"]).toBeDefined();
      });
    });
  });

  describe("Delete Project", () => {
    let deleteProjectController: DeleteProjectController;

    beforeEach(() => {
      deleteProjectController = new DeleteProjectController();
    });

    describe("if project does not exist, send 'Not Found' response", () => {
      const request = {
        params: { id: "" },
      };

      it("should have status code '404 Not Found'", async () => {
        const response = await deleteProjectController.processRequest(request);

        expect(response.statusCode).toBe(HTTPStatus.NotFound);
      });

      it("should have header 'Content-Type' set to 'application/json'", async () => {
        const response = await deleteProjectController.processRequest(request);

        expect(response.headers["Content-Type"]).toBeDefined();
        expect(response.headers["Content-Type"]).toBe("application/json");
      });
    });

    describe("if project exists, delete the project and send a copy to client", () => {
      const request = {
        params: { id: "" },
      };

      it.todo("should have status code '200 OK'");

      it("should have header 'Content-Type' set to 'application/json'", async () => {
        const response = await deleteProjectController.processRequest(request);

        expect(response.headers["Content-Type"]).toBeDefined();
        expect(response.headers["Content-Type"]).toBe("application/json");
      });
    });
  });
});
