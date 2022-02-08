import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RequestService from "../../services/RequestService";
import { useModalContext } from "../../store/modal";
import { ApiRequestType } from "../../typings/api";

export const useRequestDetailsLogic = () => {
  const [request, setRequest] = useState<ApiRequestType>();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    actions: { openModal },
  } = useModalContext();

  useEffect(() => {
    if (!id) return;

    RequestService.get(id, { responseCount: 1, responseOrder: "desc" })
      .then((r) => {
        setRequest(r.data.data);
      })
      .catch((e) => {
        openModal({ message: "something went wrong, try again later" });
        navigate("/");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    try {
      if (!request) throw new Error();

      await RequestService.delete(request.id);
      navigate("/");
    } catch (e) {
      openModal({ message: "Couldn't delete request, try again later" });
    }
  };

  const handleEdit = () => {
    if (!request) return openModal({ message: "Something went wrong" });

    navigate(`/edit-request/${request.id}`);
  };

  return { request, handleDelete, handleEdit };
};
