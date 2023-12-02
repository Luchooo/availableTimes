import { DateTime } from "../../interfaces";
import { getFmHour } from "../../utils/dateUtils";

type ListHours = {
  title: string;
  dates: DateTime[];
};
export const ListHours = ({ title, dates }: ListHours) => {
  const classTitle =
    title === "Available times" ? "text-green-400" : "text-red-400";

  return (
    <div className="backdrop-blur-sm bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-blue-200 hover:border-2 transition-colors duration-300">
      <h2
        className={`text-xl text-center font-semibold mb-4 drop-shadow-sm ${classTitle}`}
      >
        {title}
      </h2>
      <ul>
        {dates.map((hourAval, idx) => (
          <li className="flex justify-center" key={idx}>
            <div className="w-2/3 rounded-sm flex flex-col justify-center bg-white shadow p-3 items-center hover:shadow-lg transition delay-0 duration-300 ease-in-out hover:scale-105 transform">
              <div className="md:col-start-2 col-span-11 xl:-ml-5">
                <p className="text-sm text-black font-normal ">
                  {getFmHour(hourAval.startTime) +
                    " - " +
                    getFmHour(hourAval.endTime)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
