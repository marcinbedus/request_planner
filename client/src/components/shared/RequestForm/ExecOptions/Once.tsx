import React from "react";
import { useFormikContext } from "formik";
import DateTimePicker from "react-datetime-picker";
import { CreateRequestValuesOnce } from "../../../../typings/app";

export const Once = () => {
  const { values, setFieldValue } = useFormikContext<CreateRequestValuesOnce>();

  return (
    <>
      <DateTimePicker
        className="m-2"
        value={new Date(values.execOptions[0].date)}
        onChange={(date) => setFieldValue("execOptions[0].date", date)}
      />
    </>
  );
};
