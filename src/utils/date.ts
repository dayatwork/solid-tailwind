export const formatDate = (
  _date: string | Date,
  locales?: string,
  options?: Intl.DateTimeFormatOptions
) => {
  let date = typeof _date === "string" ? new Date(_date) : _date;

  return date.toLocaleString(
    locales || "en-EN",
    options || {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
};

export const formatDateTime = (
  _date: string | Date,
  locales?: string,
  options?: Intl.DateTimeFormatOptions
) => {
  let date = typeof _date === "string" ? new Date(_date) : _date;

  return date.toLocaleString(
    locales || "en-EN",
    options || {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
};

export const formatTime = (dateString?: string | Date) => {
  if (!dateString) return "";
  let date = typeof dateString === "string" ? new Date(dateString) : dateString;
  return date.toLocaleTimeString("id-ID").split(".").join(":");
};

const currentDate = new Date();
const year = new Date(currentDate.getFullYear(), 0, 1);
export const CURRENT_YEAR = currentDate.getFullYear();
export const CURRENT_DAY = Math.floor(
  (currentDate.getTime() - year.getTime()) / (24 * 60 * 60 * 1000)
);
export const CURRENT_WEEK = Math.ceil(
  (currentDate.getDay() + 1 + CURRENT_DAY) / 7
);
