import React from "react";
import { ApiRequestType } from "../../../typings/api";
import { DailyTime } from "./DailyTime";
import { MonthlyTime } from "./MonthlyTime";
import { OnceTime } from "./OnceTime";
import { WeeklyTime } from "./WeeklyTime";

interface ExecOptionsProps {
  request: ApiRequestType;
}

export const ExecOptions: React.FC<ExecOptionsProps> = ({ request }) => {
  const renderProperTimeOptions = () => {
    switch (request.type) {
      case "once":
        return <OnceTime execOptions={request.execOptions} />;
      case "daily":
        return <DailyTime execOptions={request.execOptions} />;
      case "weekly":
        return <WeeklyTime execOptions={request.execOptions} />;
      case "monthly":
        return <MonthlyTime execOptions={request.execOptions} />;
    }
  };

  return <>{renderProperTimeOptions()}</>;
};
