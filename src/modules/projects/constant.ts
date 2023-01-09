import { AppColor } from "../../components";
import { ProjectStatus } from "./type";

export const PROJECT_STATUS: Record<
  ProjectStatus,
  { label: string; value: ProjectStatus; color: AppColor }
> = {
  draft: {
    label: "Draft",
    color: "gray",
    value: "draft",
  },
  planning: {
    label: "Planning",
    color: "blue",
    value: "planning",
  },
  ongoing: {
    label: "Ongoing",
    color: "green",
    value: "ongoing",
  },
  done: {
    label: "Done",
    color: "purple",
    value: "done",
  },
  canceled: {
    label: "Canceled",
    color: "red",
    value: "canceled",
  },
  pending: {
    label: "Pending",
    color: "yellow",
    value: "pending",
  },
};

export const projectStatusOptions = Object.keys(PROJECT_STATUS).map(
  (v: ProjectStatus) => ({
    label: PROJECT_STATUS[v].label,
    value: v,
  })
);
