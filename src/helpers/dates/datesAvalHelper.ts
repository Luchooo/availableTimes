import { Dates, DateTime } from "../../interfaces";
import { hourInit, hourEnd, randomDate } from "../../utils/constantsUtils";
import { getFmtDates, getSortedDates } from "./datesHelper";
import { appointments as initAppointments } from "../../mocks/appointments";

export const getTimesAvailable = (
  dates: Dates,
  day: string,
  minDuration: number,
  getTimesFromCheckAvalFn: (
    startTime: number,
    endTime: number,
    minDuration: number
  ) => DateTime[] = getTimesFromCheckAval,
  randomDate: string,
  hourInit: string,
  hourEnd: string
): DateTime[] => {
  const timesAvailable: DateTime[] = [];

  const weekday = dates[day];
  if (Array.isArray(weekday)) {
    // Append morning
    const startTimeInit = new Date(`${randomDate}T${hourInit}`).getTime();
    const timesAvalMCheck = getTimesFromCheckAvalFn(
      weekday[0]?.startTime,
      startTimeInit,
      minDuration
    );
    if (timesAvalMCheck.length > 0) {
      timesAvailable.push(...timesAvalMCheck);
    }

    // Append journal
    for (let i = 0; i < weekday.length; i++) {
      if (weekday[i + 1]) {
        const timesAvalCheck = getTimesFromCheckAvalFn(
          weekday[i + 1]?.startTime,
          weekday[i].endTime,
          minDuration
        );
        if (timesAvalCheck.length > 0) {
          timesAvailable.push(...timesAvalCheck);
        }
      }
    }

    // Append night
    const endTimeInit = new Date(`${randomDate}T${hourEnd}`).getTime();
    const timesAvalNCheck = getTimesFromCheckAvalFn(
      endTimeInit,
      weekday[weekday.length - 1]?.endTime,
      minDuration
    );
    if (timesAvalNCheck.length > 0) {
      timesAvailable.push(...timesAvalNCheck);
    }
  } else {
    throw new Error("The day don't exist");
  }

  return timesAvailable;
};

const getTimesFromCheckAval = (
  startTime: number,
  endTime: number,
  minDuration: number
): DateTime[] => {
  const timesFromCheckAval: DateTime[] = [];
  const oneMinuteMs = 1000 * 60;
  const diffMin = Math.floor((startTime - endTime) / oneMinuteMs);

  if (diffMin >= minDuration) {
    const numberOfSlots = Math.floor(diffMin / minDuration);
    for (let i = 0; i < numberOfSlots; i++) {
      const dateTime = new Date(endTime);
      dateTime.setMinutes(dateTime.getMinutes() + minDuration);
      const endTimeTmp = dateTime.getTime();
      timesFromCheckAval.push({
        startTime: endTime,
        endTime: endTimeTmp,
      });
      endTime = endTimeTmp;
    }
  }

  return timesFromCheckAval;
};

export const getTimesAvalByDay = (
  day: string,
  minDuration: number
): DateTime[] => {
  try {
    const dates: Dates = getFmtDates(
      initAppointments,
      randomDate,
      hourInit,
      hourEnd
    );
    const sortedDates: Dates = getSortedDates(dates);
    return getTimesAvailable(
      sortedDates,
      day,
      minDuration,
      getTimesFromCheckAval,
      randomDate,
      hourInit,
      hourEnd
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTimesBussyByDay = (day: string): DateTime[] => {
  try {
    const dates: Dates = getFmtDates(
      initAppointments,
      randomDate,
      hourInit,
      hourEnd
    );
    const sortedDates: Dates = getSortedDates(dates);
    return sortedDates[day];
  } catch (error) {
    console.error(error);
    return [];
  }
};
