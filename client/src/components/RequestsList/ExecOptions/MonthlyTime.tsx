import React from "react";
import { ApiExecOptionsMonthly } from "../../../typings/api";

interface MonthlyTimeProps {
  execOptions: ApiExecOptionsMonthly[];
}

export const MonthlyTime: React.FC<MonthlyTimeProps> = ({ execOptions }) => {
  return (
    <>
      {execOptions.map((option, index) => (
        <p key={index}>
          {option.day}: {option.hour}
        </p>
      ))}
    </>
  );
};
