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
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
};
