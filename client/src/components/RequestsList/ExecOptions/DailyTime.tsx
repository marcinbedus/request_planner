import React from "react";
import { ApiExecOptionsDaily } from "../../../typings/api";

interface DailyTimeProps {
  execOptions: ApiExecOptionsDaily[];
}

export const DailyTime: React.FC<DailyTimeProps> = ({ execOptions }) => {
  return (
    <>
      {execOptions.map((option, index) => (
        <p key={index}>{option.hour}</p>
      ))}
    </>
  );
};
