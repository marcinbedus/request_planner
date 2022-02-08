import React from "react";
import { ApiExecOptionsWeekly } from "../../../typings/api";
import { dayNames } from "../../../utils/constants";

interface WeeklyTimeProps {
  execOptions: ApiExecOptionsWeekly[];
}

export const WeeklyTime: React.FC<WeeklyTimeProps> = ({ execOptions }) => {
  return (
    <>
      {execOptions.map((option, index) => (
        <p key={index}>
          {dayNames[option.day]}: {option.hour}
        </p>
      ))}
    </>
  );
};
