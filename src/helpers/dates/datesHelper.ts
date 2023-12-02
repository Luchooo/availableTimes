import { Appointment, Dates } from "../../interfaces";

export const getFmtDates = (
  appointments: Appointment[],
  randomDate: string,
  hourStart: string,
  hourFinish: string
): Dates => {
  const dates: Dates = {};

  for (let i = 0; i < appointments.length; i++) {
    const { Day, Hour, Duration } = appointments[i];

    const hourInt = parseInt(Hour);
    const durationInt = parseInt(Duration);

    if (hourInt >= parseInt(hourStart) && hourInt <= parseInt(hourFinish)) {
      if (!dates[Day]) {
        dates[Day] = [];
      }

      const startTime = new Date(`${randomDate}T${Hour}`).getTime();
      const oneMinuteMs = 1000 * 60;
      const endTime = startTime + durationInt * oneMinuteMs;

      dates[Day].push({
        startTime,
        endTime,
      });
    }
  }

  return dates;
};

export const getSortedDates = (dates: Dates): Dates => {
  for (const day in dates) {
    dates[day]?.sort((a, b) => a.startTime - b.startTime);
  }

  return dates;
};
