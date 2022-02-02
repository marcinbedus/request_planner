import React from "react";
import moment from "moment";
import { ApiExecOptionsOnce } from "../../../typings/api";

interface OnceTimeProps {
  execOptions: ApiExecOptionsOnce[];
}

export const OnceTime: React.FC<OnceTimeProps> = ({ execOptions }) => {
  return <p>{moment(execOptions[0].date).format("YYYY-MM-DD HH:mm")}</p>;
};
