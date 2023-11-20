import { Project } from "../entities/Project";
import { InMemoryProjectRepository } from "../repositories/projects.repository";
import {
  CreateProjectUseCase,
  DeleteProjectUseCase,
  FindProjectUseCase,
  GetProjectsUseCase,
  UpdateProjectUseCase,
} from "./projects.use-case";

class MockProjectRepository extends InMemoryProjectRepository {}

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

describe("Project Use Cases (Unit Tests)", () => {
  describe("Create Project", () => {
    let mockProjectRepository: InMemoryProjectRepository;
    let createProjectUseCase: CreateProjectUseCase;

    beforeEach(() => {
      jest.clearAllMocks();
      mockProjectRepository = new MockProjectRepository();
      createProjectUseCase = new CreateProjectUseCase(mockProjectRepository);
    });

    it("should call 'insert' method in ProjectRepository", async () => {
      jest
        .spyOn(mockProjectRepository, "insert")
        .mockImplementation(() => Promise.resolve(true));

      const payload: Partial<Project> = {};

      expect(mockProjectRepository.insert).toBeCalledTimes(0);

      await createProjectUseCase.execute(payload);

      expect(mockProjectRepository.insert).toBeCalledTimes(1);
    });
  });

  describe("Get Projects", () => {
    let mockProjectRepository: InMemoryProjectRepository;
    let getProjectsUseCase: GetProjectsUseCase;

    beforeEach(() => {
      jest.clearAllMocks();
      mockProjectRepository = new MockProjectRepository();
      getProjectsUseCase = new GetProjectsUseCase(mockProjectRepository);
    });

    it("should call 'getAll' method in ProjectRepository", async () => {
      jest
        .spyOn(mockProjectRepository, "getAll")
        .mockImplementation(() => Promise.resolve([]));

      expect(mockProjectRepository.getAll).toBeCalledTimes(0);

      await getProjectsUseCase.execute();

      expect(mockProjectRepository.getAll).toBeCalledTimes(1);
    });
  });

  describe("Find Project", () => {
    let mockProjectRepository: InMemoryProjectRepository;
    let findProjectUseCase: FindProjectUseCase;

    beforeEach(() => {
      jest.clearAllMocks();
      mockProjectRepository = new MockProjectRepository();
      findProjectUseCase = new FindProjectUseCase(mockProjectRepository);
    });

    it("should call 'getById' method in ProjectRepository", async () => {
      jest
        .spyOn(mockProjectRepository, "getById")
        .mockImplementation(() => Promise.resolve(fakeProject));

      const id = "uuid";

      expect(mockProjectRepository.getById).toBeCalledTimes(0);

      await findProjectUseCase.execute(id);

      expect(mockProjectRepository.getById).toBeCalledTimes(1);
    });
  });

  describe("Update Project", () => {
    let mockProjectRepository: InMemoryProjectRepository;
    let updateProjectUseCase: UpdateProjectUseCase;

    beforeEach(() => {
      jest.clearAllMocks();
      mockProjectRepository = new MockProjectRepository();
      updateProjectUseCase = new UpdateProjectUseCase(mockProjectRepository);
    });

    it("should call 'update' method in ProjectRepository", async () => {
      jest
        .spyOn(mockProjectRepository, "update")
        .mockImplementation(() => Promise.resolve(fakeProject));

      expect(mockProjectRepository.update).toBeCalledTimes(0);

      await updateProjectUseCase.execute({
        id: "uuid",
        title: "",
        description: "",
        ownerId: null,
      });

      expect(mockProjectRepository.update).toBeCalledTimes(1);
    });
  });

  describe("Delete Project", () => {
    let mockProjectRepository: InMemoryProjectRepository;
    let deleteProjectUseCase: DeleteProjectUseCase;

    beforeEach(() => {
      jest.clearAllMocks();
      mockProjectRepository = new MockProjectRepository();
      deleteProjectUseCase = new DeleteProjectUseCase(mockProjectRepository);
    });

    it("should call 'delete' method in ProjectRepository", async () => {
      jest
        .spyOn(mockProjectRepository, "delete")
        .mockImplementation(() => Promise.resolve(fakeProject));

      expect(mockProjectRepository.delete).toBeCalledTimes(0);

      await deleteProjectUseCase.execute("id");

      expect(mockProjectRepository.delete).toBeCalledTimes(1);
    });
  });
});
