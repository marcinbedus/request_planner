import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RequestTypeDropdown } from "../shared/RequestTypeDropdown";
import { ExecOptions } from "./ExecOptions";
import { useRequestsListLogic } from "./logic";

export const RequestsList = () => {
  const { requests, requestType, setRequestType } = useRequestsListLogic();
  const navigate = useNavigate();

  console.log(requests);

  return (
    <Container>
      <div className="d-inline-flex align-items-center m-2">
        <span>Select request type:</span>
        <RequestTypeDropdown onClick={setRequestType} value={requestType} />
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>method</th>
            <th>url</th>
            <th>time</th>
            <th>details</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.method}</td>
              <td>{request.url}</td>
              <td>{<ExecOptions request={request} />}</td>
              <td>
                <Button onClick={() => navigate(`/${request.id}`)}>
                  {">"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
