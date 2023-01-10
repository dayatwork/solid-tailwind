import { AppColor } from "../../components";
import { TaskStatus } from "./type";

export const TASK_STATUS: Record<
  TaskStatus,
  { label: string; value: TaskStatus; color: AppColor }
> = {
  assigned: {
    label: "Assigned",
    color: "gray",
    value: "assigned",
  },
  ongoing: {
    label: "Ongoing",
    color: "blue",
    value: "ongoing",
  },
  completed: {
    label: "Completed",
    color: "green",
    value: "completed",
  },
  checked: {
    label: "Checked",
    color: "indigo",
    value: "checked",
  },
};

export const taskStatusOptions = Object.keys(TASK_STATUS).map(
  (v: TaskStatus) => ({
    label: TASK_STATUS[v].label,
    value: v,
  })
);
