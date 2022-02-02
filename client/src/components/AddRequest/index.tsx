import React from "react";
import { RequestForm } from "../shared/RequestForm";
import { useAddRequestLogic } from "./logic";

export const AddRequest = () => {
  const { handleSubmit, initialValues } = useAddRequestLogic();

  return (
    <RequestForm
      type={"create"}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
};
