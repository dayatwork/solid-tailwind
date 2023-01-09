import { AppColor } from "../../components";
import { WorkplanStatus } from "./type";

export const WORKPLAN_STATUS: Record<
  WorkplanStatus,
  { label: string; value: WorkplanStatus; color: AppColor }
> = {
  planned: {
    label: "Planned",
    color: "gray",
    value: "planned",
  },
  approved: {
    label: "Approved",
    color: "blue",
    value: "approved",
  },
  rejected: {
    label: "Rejected",
    color: "red",
    value: "rejected",
  },
  picked: {
    label: "Picked",
    color: "green",
    value: "picked",
  },
  postponed: {
    label: "Postponed",
    color: "yellow",
    value: "postponed",
  },
};

export const workplanStatusOptions = Object.keys(WORKPLAN_STATUS).map(
  (v: WorkplanStatus) => ({
    label: WORKPLAN_STATUS[v].label,
    value: v,
  })
);
