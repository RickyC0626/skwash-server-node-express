import { Project } from "../entities/Project";
import {
  CreateProjectUseCase,
  DeleteProjectUseCase,
  FindProjectUseCase,
  GetProjectsUseCase,
  UpdateProjectUseCase,
} from "./projects.use-case";

describe("Project Use Cases (Integration Tests)", () => {
  describe("Create Project", () => {
    let createProjectUseCase: CreateProjectUseCase;

    beforeEach(() => {
      createProjectUseCase = new CreateProjectUseCase();
    });

    describe("if execution is successful", () => {
      it("should insert new project in the database", async () => {
        const payload: Partial<Project> = {
          title: "Test Project",
          description: "test",
        };

        const inserted = await createProjectUseCase.execute(payload);

        expect(inserted).toMatchObject(payload);
      });
    });

    // TODO: Test with actual database, not in-memory map
    // This covers cases where database connection is invalid
    describe("if execution is unsuccessful", () => {
      it.todo("should return failed response");
    });
  });

  describe("Get Projects", () => {
    let getProjectsUseCase: GetProjectsUseCase;

    beforeEach(() => {
      getProjectsUseCase = new GetProjectsUseCase();
    });

    // TODO: Test when empty and with existing items
    it("should retrieve all projects from database", async () => {
      const retrieved = await getProjectsUseCase.execute();

      expect(retrieved).toBeDefined();
    });
  });

  describe("Find Project", () => {
    let findProjectUseCase: FindProjectUseCase;

    beforeEach(() => {
      findProjectUseCase = new FindProjectUseCase();
    });

    describe("if project is not found", () => {
      it("should result in error", async () => {
        const findProject = async () =>
          await findProjectUseCase.execute("invalid-id");

        expect(findProject()).rejects.toEqual(
          Error("Project with id 'invalid-id' not found in database!")
        );
      });
    });

    describe("if project is found", () => {
      it.todo("should return the found project");
    });
  });

  describe("Update Project", () => {
    let updateProjectUseCase: UpdateProjectUseCase;

    beforeEach(() => {
      updateProjectUseCase = new UpdateProjectUseCase();
    });

    it("should return a project", async () => {
      const project = await updateProjectUseCase.execute({ id: "invalid-id" });

      expect(project).toBeDefined();
    });
  });

  describe("Delete Project", () => {
    let deleteProjectUseCase: DeleteProjectUseCase;

    beforeEach(() => {
      deleteProjectUseCase = new DeleteProjectUseCase();
    });

    describe("if project is not found", () => {
      it("should throw error", async () => {
        const deleteProject = async () =>
          await deleteProjectUseCase.execute("invalid-id");

        expect(deleteProject()).rejects.toEqual(
          Error("Project with id 'invalid-id' not found in database!")
        );
      });
    });

    describe("if project is found", () => {
      it.todo("should return deleted project");
    });
  });
});
