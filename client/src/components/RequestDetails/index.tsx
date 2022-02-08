import React from "react";
import { useRequestDetailsLogic } from "./logic";
import { JSONTree } from "react-json-tree";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { JSONTreeTheme } from "../../utils/constants";

export const RequestDetails = () => {
  const { request, handleDelete } = useRequestDetailsLogic();
  const navigate = useNavigate();

  return (
    <>
      {request && (
        <Container className="mt-5 ">
          <Card>
            <Card.Title className="align-items-center m-2 d-flex justify-content-between">
              <h4 className="m-1">Request details:</h4>
              <div>
                <Button
                  onClick={() => navigate(`/edit-request/${request.id}`)}
                  variant="outline-success"
                  className="m-1"
                >
                  Edit
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="outline-danger"
                  className="m-1"
                >
                  Delete
                </Button>
              </div>
            </Card.Title>
            <Card.Body>
              <div>
                <h5>Url: </h5>
                <p>{request.url}</p>
              </div>
              <div>
                <h5>Method: </h5>
                <p>{request.method}</p>
              </div>
              <div>
                <h5>Headers:</h5>
                <JSONTree theme={JSONTreeTheme} data={request.headers} />
              </div>
              <div>
                <h5>Body:</h5>
                <JSONTree theme={JSONTreeTheme} data={request.body} />
              </div>
              {request.lastResponses[0] ? (
                <>
                  <div>
                    <h5>Last execution data:</h5>
                    <JSONTree
                      theme={JSONTreeTheme}
                      data={request.lastResponses[0].data}
                    />
                  </div>
                  <Card.Footer>
                    <p>
                      {moment(request.lastResponses[0].createdAt).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </p>
                  </Card.Footer>
                </>
              ) : (
                <p>Request not executed yet</p>
              )}
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
};
