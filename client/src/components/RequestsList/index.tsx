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
            <th>url</th>
            <th>body</th>
            <th>headers</th>
            <th>method</th>
            <th>time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.url}</td>
              <td>{JSON.stringify(request.body)}</td>
              <td>{JSON.stringify(request.headers)}</td>
              <td>{request.method}</td>
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
