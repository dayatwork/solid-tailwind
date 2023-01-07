import { AppColor } from "../../components";
import { capitalize } from "../../utils/string";

export const PROJECT_STATUS = [
  "draft",
  "planning",
  "ongoing",
  "done",
  "canceled",
  "pending",
] as const;

export type ProjectStatus = typeof PROJECT_STATUS[number];

export const PROJECT_STATUS_COLOR: Record<ProjectStatus, AppColor> = {
  draft: "gray",
  planning: "blue",
  ongoing: "green",
  done: "purple",
  canceled: "red",
  pending: "yellow",
};

export const projectStatusOptions = PROJECT_STATUS.map((v) => ({
  label: capitalize(v),
  value: v,
}));
