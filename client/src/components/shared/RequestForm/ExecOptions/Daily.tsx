import React from "react";
import { FieldArray, useFormikContext } from "formik";
import { CreateRequestValuesDaily } from "../../../../typings/app";
import TimePicker from "react-time-picker";
import { Button } from "react-bootstrap";

export const Daily = () => {
  const { values, setFieldValue } =
    useFormikContext<CreateRequestValuesDaily>();

  return (
    <FieldArray name="execOptions">
      {({ push, remove }) => (
        <>
          {values.execOptions.map((option, index) => (
            <React.Fragment key={index}>
              <div className="d-flex align-items-center">
                <TimePicker
                  onChange={(value) =>
                    setFieldValue(`execOptions[${index}]`, { hour: value })
                  }
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
            </React.Fragment>
          ))}
          <Button
            variant="outline-success"
            className="mt-1"
            onClick={() => push({ hour: "7:00" })}
          >
            Add
          </Button>
        </>
      )}
    </FieldArray>
  );
};
