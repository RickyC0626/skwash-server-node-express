import { Project } from "../entities/Project";
import { ProjectRepository } from "./ProjectRepository";
import { InMemoryProjectRepository } from "./projects.repository";

describe("Project Repository (Integration Tests)", () => {
  describe("getById", () => {
    let projectRepo: ProjectRepository;
    const testProject: Project = {
      id: "3fb50656-3f20-487e-ae1c-9d6e9897e900",
      title: "Random Title",
      ownerId: null,
      timeCreated: 0,
      timeUpdated: 0,
      members: [],
      issues: [],
    };

    beforeEach(() => {
      projectRepo = new InMemoryProjectRepository(
        new Map([["3fb50656-3f20-487e-ae1c-9d6e9897e900", testProject]])
      );
    });

    it("should return project if found", async () => {
      const id = "3fb50656-3f20-487e-ae1c-9d6e9897e900";

      expect(projectRepo.getById(id)).resolves.toEqual(testProject);
    });

    it("should throw error if project is not found", async () => {
      const id = "not-exist";
      const errorMsg = `Project with id '${id}' not found in database!`;

      expect(() => projectRepo.getById(id)).rejects.toThrowError(errorMsg);
    });
  });

  describe("delete", () => {
    let projectRepo: ProjectRepository;
    const testProject: Project = {
      id: "1e476322-18f3-4aaa-8c3b-084f69c8602a",
      title: "Project to Delete",
      ownerId: null,
      timeCreated: 0,
      timeUpdated: 0,
      members: [],
      issues: [],
    };

    beforeEach(() => {
      projectRepo = new InMemoryProjectRepository(
        new Map([["1e476322-18f3-4aaa-8c3b-084f69c8602a", testProject]])
      );
    });

    it("should return project after deleting it", () => {
      const id = "1e476322-18f3-4aaa-8c3b-084f69c8602a";

      expect(projectRepo.delete(id)).resolves.toEqual(testProject);
    });
  });
});
