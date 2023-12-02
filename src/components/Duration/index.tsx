import { ChangeEvent } from "react";

type DurationProps = {
  duration: number;
  onDurationChange: (duration: number) => void;
};

export const Duration = ({ duration, onDurationChange }: DurationProps) => {
  const handleDurationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onDurationChange(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="duration"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Duration
      </label>
      <select
        id="duration"
        className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-blue-300 transition-colors duration-300"
        value={duration}
        onChange={handleDurationChange}
      >
        <option value="30">30 Minutos</option>
        <option value="45">45 Minutos</option>
        <option value="60">60 Minutos</option>
        <option value="90">90 Minutos</option>
      </select>
    </div>
  );
};
