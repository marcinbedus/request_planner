import React from "react";
import { ErrorMessage, Field, FieldArray, useFormikContext } from "formik";
import { Button, Form } from "react-bootstrap";
import { CreateRequestValues } from "../../../typings/app";

export const Data = () => {
  const { values } = useFormikContext<CreateRequestValues>();

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>url: </Form.Label>
        <Field as={Form.Control} name="url" type="text" />
        <ErrorMessage
          component={Form.Text}
          className="text-danger"
          name="url"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>method: </Form.Label>
        <Field as={Form.Control} name="method" type="text" />
        <ErrorMessage
          component={Form.Text}
          className="text-danger"
          name="method"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>headers: </Form.Label>
        <FieldArray name="headers">
          {({ push, remove }) => (
            <div>
              {values.headers.map((_, index) => (
                <div key={index} className="d-flex align-items-center">
                  <div>
                    <Field placeholder="key" name={`headers[${index}].key`} />
                  </div>
                  <div>
                    <Field
                      className="m-1"
                      placeholder="value"
                      name={`headers[${index}].value`}
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => remove(index)}
                  >
                    x
                  </Button>
                </div>
              ))}

              <Button
                size="sm"
                variant="outline-success"
                onClick={() => push({ key: "", value: "" })}
              >
                Add properties
              </Button>
            </div>
          )}
        </FieldArray>
        <ErrorMessage
          component={Form.Text}
          className="text-danger"
          name="headers"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>body: </Form.Label>
        <FieldArray name="body">
          {({ push, remove }) => (
            <div className="flex column">
              {values.body.map((_, index) => (
                <div>
                  <Field placeholder="key" name={`body[${index}].key`} />
                  <Field
                    className="m-1"
                    placeholder="value"
                    name={`body[${index}].value`}
                  />
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => remove(index)}
                  >
                    x
                  </Button>
                </div>
              ))}

              <Button
                size="sm"
                variant="outline-success"
                onClick={() => push({ key: "", value: "" })}
              >
                Add properties
              </Button>
            </div>
          )}
        </FieldArray>
        <ErrorMessage
          component={Form.Text}
          className="text-danger"
          name="body"
        />
      </Form.Group>
    </div>
  );
};
