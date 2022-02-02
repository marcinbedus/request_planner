import { useEffect, useState } from "react";
import RequestService from "../../services/RequestService";
import { useModalContext } from "../../store/modal";
import { useUserContext } from "../../store/user";
import { ApiRequestType } from "../../typings/api";
import { RequestType } from "../../typings/app";

export const useRequestsListLogic = () => {
  const [requests, setRequests] = useState<ApiRequestType[]>([]);
  const [requestType, setRequestType] = useState<RequestType>("once");

  const {
    state: { isAuthenticated },
  } = useUserContext();

  const {
    actions: { openModal },
  } = useModalContext();

  useEffect(() => {
    if (!isAuthenticated) return;

    RequestService.getAllWithType(requestType)
      .then(({ data }) => {
        setRequests(data.data);
      })
      .catch((e) =>
        openModal({
          message: "Couldn't get requests data, try again later",
        })
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, requestType]);

  const handleDelete = async (request: ApiRequestType) => {
    try {
      await RequestService.delete(request.id);

      setRequests((requests) => requests.filter((r) => r.id !== request.id));
    } catch (e) {
      openModal({ message: "Couldn't delete request, try again later" });
    }
  };

  return { requests, requestType, handleDelete, setRequestType };
};
