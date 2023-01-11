import { formatDate } from "../../utils/date";
import { Tracker, TrackerWithTask } from "./services";

export function groupTrackersByDate(trackers: TrackerWithTask[]) {
  return trackers?.reduce((acc, curr) => {
    if (acc.hasOwnProperty(formatDate(curr.start_at!))) {
      acc[formatDate(curr.start_at!)] = [
        ...acc[formatDate(curr.start_at!)],
        curr,
      ];
    } else {
      acc[formatDate(curr.start_at!)] = [curr];
    }
    return acc;
  }, {} as any) as Record<string, TrackerWithTask[]>;
}

export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("id-ID").split(".").join(":");
};

export const getNewStartTime = ({
  newTime,
  oldStartTime,
}: {
  oldStartTime: string | Date;
  newTime: string;
}) => {
  const oldStartDate =
    typeof oldStartTime === "string" ? new Date(oldStartTime) : oldStartTime;

  const year = oldStartDate.getFullYear();
  const monthIndex = oldStartDate.getMonth();
  const date = oldStartDate.getDate();
  const [hours, minutes, seconds] = newTime.split(":");

  return new Date(
    year,
    monthIndex,
    date,
    +hours,
    +minutes,
    +seconds
  ).toISOString();
};

export const getNewEndTime = ({
  newTime,
  oldEndTime,
  oldStartTime,
}: {
  oldStartTime: string | Date;
  oldEndTime: string | Date;
  newTime: string;
}) => {
  const oldEndDate =
    typeof oldEndTime === "string" ? new Date(oldEndTime) : oldEndTime;
  const oldStartDate =
    typeof oldStartTime === "string" ? new Date(oldStartTime) : oldStartTime;

  const year = oldEndDate.getFullYear();
  const monthIndex = oldEndDate.getMonth();
  const date = oldEndDate.getDate();
  const [hours, minutes, seconds] = newTime.split(":");

  const newEndDate = new Date(
    year,
    monthIndex,
    date,
    +hours,
    +minutes,
    +seconds
  );

  if (newEndDate.getTime() < oldStartDate.getTime()) {
    newEndDate.setDate(oldStartDate.getDate() + 1);
  } else {
    newEndDate.setDate(oldStartDate.getDate());
  }

  return newEndDate.toISOString();
};

export function calculateTotalDuration(
  trackers: (TrackerWithTask | Tracker)[]
) {
  return trackers.reduce((acc, curr) => {
    const duration =
      (curr.end_at ? new Date(curr.end_at) : new Date()).getTime() -
      new Date(curr.start_at!).getTime();
    return acc + duration;
  }, 0);
}

export const displayDuration = (durationInMs: number) => {
  const hours = ("0" + Math.floor((durationInMs / 3600000) % 60)).slice(-2);
  const minutes = ("0" + Math.floor((durationInMs / 60000) % 60)).slice(-2);
  const seconds = ("0" + Math.floor((durationInMs / 1000) % 60)).slice(-2);

  return `${hours}:${minutes}:${seconds}`;
};
