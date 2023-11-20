import { Project } from "../entities/Project";
import { HTTPRequest } from "../http";
import {
  CreateProjectUseCase,
  DeleteProjectUseCase,
  FindProjectUseCase,
  GetProjectsUseCase,
  UpdateProjectUseCase,
} from "../use-cases/projects.use-case";
import {
  DeleteProjectController,
  GetAllProjectsController,
  GetProjectByIdController,
  PostProjectController,
  PutProjectController,
} from "./projects.controller";

class MockCreateProjectUseCase extends CreateProjectUseCase {
  execute(): Promise<Project> {
    throw new Error("Method not implemented.");
  }
}

class MockGetProjectsUseCase extends GetProjectsUseCase {
  execute(): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
}

class MockFindProjectUseCase extends FindProjectUseCase {
  execute(): Promise<Project> {
    throw new Error("Method not implemented");
  }
}

class MockUpdateProjectUseCase extends UpdateProjectUseCase {
  execute(): Promise<Project> {
    throw new Error("Method not implemented");
  }
}

class MockDeleteProjectUseCase extends DeleteProjectUseCase {
  execute(): Promise<Project> {
    throw new Error("Method not implemented");
  }
}

const fakeProject: Project = {
  id: "82d5b5fc-56cd-4c51-aa2c-463fdba86a01",
  title: "Fake Project",
  description: "",
  ownerId: null,
  timeCreated: 0,
  timeUpdated: 0,
  members: [],
  issues: [],
};

describe("Project Controllers (Unit Tests)", () => {
  describe("Post Project", () => {
    let mockCreateProjectUseCase: CreateProjectUseCase;
    let postProjectController: PostProjectController;

    beforeEach(() => {
      jest.clearAllMocks();
      mockCreateProjectUseCase = new MockCreateProjectUseCase();
      postProjectController = new PostProjectController(
        mockCreateProjectUseCase
      );
    });

    it("should call use case executor in CreateProjectUseCase", async () => {
      jest
        .spyOn(mockCreateProjectUseCase, "execute")
        .mockImplementation(() => Promise.resolve(fakeProject));

      const request: Pick<HTTPRequest, "body"> = { body: {} };

      expect(mockCreateProjectUseCase.execute).toBeCalledTimes(0);

      await postProjectController.processRequest(request);

      expect(mockCreateProjectUseCase.execute).toBeCalledTimes(1);
    });
  });

  describe("Get All Projects", () => {
    let mockGetProjectsUseCase: GetProjectsUseCase;
    let getAllProjectsController: GetAllProjectsController;

    beforeEach(() => {
      jest.clearAllMocks();
      mockGetProjectsUseCase = new MockGetProjectsUseCase();
      getAllProjectsController = new GetAllProjectsController(
        mockGetProjectsUseCase
      );
    });

    it("should call use case executor in GetProjectsUseCase", async () => {
      jest
        .spyOn(mockGetProjectsUseCase, "execute")
        .mockImplementation(() => Promise.resolve([]));

      expect(mockGetProjectsUseCase.execute).toBeCalledTimes(0);

      await getAllProjectsController.processRequest();

      expect(mockGetProjectsUseCase.execute).toBeCalledTimes(1);
    });
  });

  describe("Get Project By Id", () => {
    let mockFindProjectUseCase: FindProjectUseCase;
    let getProjectByIdController: GetProjectByIdController;

    beforeEach(() => {
      jest.clearAllMocks();
      mockFindProjectUseCase = new MockFindProjectUseCase();
      getProjectByIdController = new GetProjectByIdController(
        mockFindProjectUseCase
      );
    });

    it("should call use case executor in FindProjectUseCase", async () => {
      jest
        .spyOn(mockFindProjectUseCase, "execute")
        .mockImplementation(() => Promise.resolve(fakeProject));

      const request: Pick<HTTPRequest, "params"> = {
        params: { id: "82d5b5fc-56cd-4c51-aa2c-463fdba86a01" },
      };

      expect(mockFindProjectUseCase.execute).toBeCalledTimes(0);

      await getProjectByIdController.processRequest(request);

      expect(mockFindProjectUseCase.execute).toBeCalledTimes(1);
    });
  });

  describe("Put Project", () => {
    let mockUpdateProjectUseCase: UpdateProjectUseCase;
    let putProjectController: PutProjectController;

    beforeEach(() => {
      jest.clearAllMocks();
      mockUpdateProjectUseCase = new MockUpdateProjectUseCase();
      putProjectController = new PutProjectController(mockUpdateProjectUseCase);
    });

    it("should call use case executor in UpdateProjectUseCase", async () => {
      jest
        .spyOn(mockUpdateProjectUseCase, "execute")
        .mockImplementation(() => Promise.resolve(fakeProject));

      const request: Pick<HTTPRequest, "params" | "body"> = {
        params: { id: "82d5b5fc-56cd-4c51-aa2c-463fdba86a0" },
        body: {},
      };

      expect(mockUpdateProjectUseCase.execute).toBeCalledTimes(0);

      await putProjectController.processRequest(request);

      expect(mockUpdateProjectUseCase.execute).toBeCalledTimes(1);
    });
  });

  describe("Delete Project", () => {
    let mockDeleteProjectUseCase: DeleteProjectUseCase;
    let deleteProjectController: DeleteProjectController;

    beforeEach(() => {
      jest.clearAllMocks();
      mockDeleteProjectUseCase = new MockDeleteProjectUseCase();
      deleteProjectController = new DeleteProjectController(
        mockDeleteProjectUseCase
      );
    });

    it("should call use case executor in DeleteProjectUseCase", async () => {
      jest
        .spyOn(mockDeleteProjectUseCase, "execute")
        .mockImplementation(() => Promise.resolve(fakeProject));

      const request: Pick<HTTPRequest, "params"> = {
        params: { id: "82d5b5fc-56cd-4c51-aa2c-463fdba86a0" },
      };

      expect(mockDeleteProjectUseCase.execute).toBeCalledTimes(0);

      await deleteProjectController.processRequest(request);

      expect(mockDeleteProjectUseCase.execute).toBeCalledTimes(1);
    });
  });
});
