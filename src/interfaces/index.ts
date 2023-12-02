export type Appointment = {
  Day: string;
  Hour: string;
  Duration: string;
};

export type DateTime = {
  startTime: number;
  endTime: number;
};

export type Dates = {
  [key in string]: DateTime[];
};
