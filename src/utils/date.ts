import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export const parseDate = (date: string, dateFormat = "dd.MM.yyyy") =>
  format(parseISO(date), dateFormat);

export const calculateTime = (durationInSeconds: number) => {
  let duration = durationInSeconds * 1000;
  const msInDay = 1000 * 60 * 60 * 24;
  const msInHour = 1000 * 60 * 60;
  const msInMinute = 1000 * 60;

  const days = Math.floor(duration / msInDay);
  duration %= msInDay;

  const hours = Math.floor(duration / msInHour);
  duration %= msInHour;

  const minutes = Math.round(duration / msInMinute);

  return { days, hours, minutes };
};
