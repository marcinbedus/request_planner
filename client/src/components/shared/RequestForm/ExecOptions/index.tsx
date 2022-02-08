import { useFormikContext } from "formik";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { CreateRequestValues } from "../../../../typings/app";
import { FormHelper } from "../../../../utils/FormHelper";
import { RequestTypeDropdown } from "../../RequestTypeDropdown";
import { Daily } from "./Daily";
import { Monthly } from "./Monthly";
import { Once } from "./Once";
import { Weekly } from "./Weekly";

export const ExecOptions: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<CreateRequestValues>();

  const renderOptions = () => {
    switch (values.type) {
      case "once":
        return <Once />;
      case "daily":
        return <Daily />;
      case "weekly":
        return <Weekly />;
      case "monthly":
        return <Monthly />;
    }
  };

  return (
    <Card>
      <Card.Body>
        <Container>
          <Row>
            <Col className="d-flex align-items-center">
              Set execution options:
            </Col>
            <Col className="d-flex justify-content-end">
              <RequestTypeDropdown
                onClick={(option) => {
                  setFieldValue("type", option);
                  setFieldValue("execOptions", [
                    FormHelper.getDefaultExecOptions(option),
                  ]);
                }}
                value={values.type}
              />
            </Col>
          </Row>
        </Container>
        <Card.Title></Card.Title>
        <Card.Text as="div">{renderOptions()}</Card.Text>
      </Card.Body>
    </Card>
  );
};
