import { randomUUID } from "crypto";

export type Project = {
  id: string;
  title: string;
  description?: string;
  ownerId: string | null;
  timeCreated: number;
  timeUpdated: number;
  members: [];
  issues: [];
};

export const createNewProject = ({
  title = "New Project",
  description = "",
  ownerId = null,
  members = [],
  issues = [],
}: Partial<Project>) =>
  Object.freeze({
    id: randomUUID(),
    title,
    description,
    ownerId,
    timeCreated: Date.now(),
    timeUpdated: Date.now(),
    members,
    issues,
  });

export const getUpdatedProject = (
  project: Project,
  {
    title = project.title,
    description = project.description,
    ownerId = project.ownerId,
    members = project.members,
    issues = project.issues,
  }: Partial<Project>
) =>
  Object.freeze({
    ...project,
    title,
    description,
    ownerId,
    timeUpdated: Date.now(),
    members,
    issues,
  });
