import { useEffect, useState } from "react";
import {
  getTimesAvalByDay,
  getTimesBussyByDay,
} from "../../helpers/dates/datesAvalHelper";
import { DateTime } from "../../interfaces";
import { firstWeekDay, minDuration } from "../../utils/constantsUtils";
import { Duration } from "../Duration/";
import { Day } from "../Day";
import { ListHours } from "../ListHours";

export const Scheduling = () => {
  const [duration, setDuration] = useState(minDuration);
  const [day, setSelectedOption] = useState(firstWeekDay);
  const [datesAval, setDatesAval] = useState<DateTime[]>([]);
  const [datesBussy, setDatesBussy] = useState<DateTime[]>([]);

  const handleDayChange = (selectedDay: string) => {
    setSelectedOption(selectedDay);
    const dates = getTimesAvalByDay(selectedDay, duration);
    const dtsBussy = getTimesBussyByDay(selectedDay);
    setDatesBussy(dtsBussy);
    setDatesAval(dates);
  };

  const handleDurationChange = (selectedDuration: number) => {
    setDuration(selectedDuration);
    const dates = getTimesAvalByDay(day, selectedDuration);
    setDatesAval(dates);
  };

  const initializeDatesAval = () => {
    const initialDates = getTimesAvalByDay(day, duration);
    setDatesAval(initialDates);
  };

  const initializeDatesBussy = () => {
    const initialBussyDates = getTimesBussyByDay(day);
    setDatesBussy(initialBussyDates);
  };

  useEffect(() => {
    initializeDatesAval();
    initializeDatesBussy();
  }, []);

  return (
    <main>
      <section className="bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center h-screen">
        <article className="w-11/12 sm:w-11/12 md:w-8/12 lg:w-6/12 backdrop-blur-sm bg-white/40 p-6 rounded-lg shadow-sm border-blue-200 border">
          <header className="w-full flex justify-between items-center p-3">
            <h2 className="text-xl font-semibold">Available times</h2>
          </header>
          <div className="w-full flex justify-center p-1 mb-4">
            <div className="relative w-full flex flex-row gap-4">
              <Duration
                duration={duration}
                onDurationChange={handleDurationChange}
              />
              <Day day={day} onDayChange={handleDayChange} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <ListHours title={"Available times"} dates={datesAval} />
            <ListHours title={"Bussy times"} dates={datesBussy} />
          </div>
        </article>
      </section>
    </main>
  );
};
