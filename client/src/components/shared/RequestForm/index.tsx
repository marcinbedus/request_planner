import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { CreateRequestValues } from "../../../typings/app";
import { Data } from "./Data";
import { ExecOptions } from "./ExecOptions";
import { useRequestFormLogic } from "./logic";

interface RequestFormProps {
  type: "edit" | "create";
  onSubmit: (
    values: CreateRequestValues,
    { setSubmitting, resetForm }: FormikHelpers<CreateRequestValues>
  ) => Promise<void>;
  initialValues: CreateRequestValues;
}

export const RequestForm: React.FC<RequestFormProps> = ({
  type,
  onSubmit,
  initialValues,
}) => {
  const { validationSchema } = useRequestFormLogic();

  return (
    <Container className="mt-4 mw-50" fluid="sm">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ handleSubmit }) => {
          return (
            <Card>
              <Card.Title className="text-center pt-4">
                {type === "create" ? "Add" : "Edit"}
              </Card.Title>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Data />
                  <ExecOptions />

                  <div className="d-flex justify-content-center">
                    <Button
                      variant="outline-primary"
                      className="mt-2"
                      type="submit"
                    >
                      {type === "create" ? "Add" : "Edit"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          );
        }}
      </Formik>
    </Container>
  );
};
