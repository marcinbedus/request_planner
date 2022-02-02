import { Field, FieldArray, useFormikContext } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import TimePicker from "react-time-picker";
import { CreateRequestValuesMonthly } from "../../../../typings/app";

export const Monthly = () => {
  const { values, setFieldValue } =
    useFormikContext<CreateRequestValuesMonthly>();

  return (
    <FieldArray name="execOptions">
      {({ push, remove }) => (
        <>
          {values.execOptions.map((option, index) => (
            <div key={index} className="d-flex flex-row align-items-center">
              <Form.Select
                value={values.execOptions[index].day}
                size="sm"
                style={{ width: "25%" }}
                onChange={(event: any) => {
                  setFieldValue(
                    `execOptions[${index}].day`,
                    parseInt(event.target.value)
                  );
                }}
              >
                {Array.from({ length: 31 }).map((_, index) => (
                  <option value={index + 1}>{index + 1}</option>
                ))}
              </Form.Select>

              <TimePicker
                className="m-1"
                key={index}
                onChange={(value) => {
                  setFieldValue(`execOptions[${index}].hour`, value);
                }}
                value={option.hour}
              />

              {values.execOptions.length > 1 ? (
                <Button
                  variant="outline-danger m-2"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  x
                </Button>
              ) : null}
            </div>
          ))}
          <Button
            variant="outline-success"
            className="mt-2"
            onClick={() => push({ day: 1, hour: "7:00" })}
          >
            Add
          </Button>
        </>
      )}
    </FieldArray>
  );
};
