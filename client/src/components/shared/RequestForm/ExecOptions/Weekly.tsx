import { FieldArray, useFormikContext } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import TimePicker from "react-time-picker";
import { CreateRequestValuesWeekly } from "../../../../typings/app";
import { dayNames } from "../../../../utils/constants";

export const Weekly: React.FC = () => {
  const { values, setFieldValue } =
    useFormikContext<CreateRequestValuesWeekly>();

  return (
    <>
      <FieldArray name="execOptions">
        {({ push, remove }) => (
          <>
            {values.execOptions.map((option, index) => (
              <div key={index} className="d-flex flex-row align-items-center">
                <Form.Select
                  size="sm"
                  style={{ width: "25%" }}
                  value={values.execOptions[index].day}
                  onChange={(event: any) => {
                    setFieldValue(
                      `execOptions[${index}].day`,
                      parseInt(event.target.value)
                    );
                  }}
                >
                  {dayNames.map((day, index) => (
                    <option key={index} value={index + 1}>
                      {day}
                    </option>
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
              className="mt-1"
              onClick={() => push({ day: 1, hour: "7:00" })}
            >
              Add
            </Button>
          </>
        )}
      </FieldArray>
    </>
  );
};
