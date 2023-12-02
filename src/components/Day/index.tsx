import { ChangeEvent } from "react";

type DayProps = {
  day: string;
  onDayChange: (day: string) => void;
};

export const Day = ({ day, onDayChange }: DayProps) => {
  const handleDayChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onDayChange(event.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="day"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Day
      </label>
      <select
        id="day"
        className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-blue-300 transition-colors duration-300"
        value={day}
        onChange={handleDayChange}
      >
        <option value="lunes">Lunes</option>
        <option value="martes">Martes</option>
        <option value="miércoles">Miercoles</option>
        <option value="jueves">Jueves</option>
        <option value="viernes">Viernes</option>
      </select>
    </div>
  );
};
