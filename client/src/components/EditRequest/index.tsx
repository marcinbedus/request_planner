import React from "react";
import { RequestForm } from "../shared/RequestForm";
import { useEditRequestLogic } from "./logic";

export const EditRequest = () => {
  const { handleSubmit, initialValues } = useEditRequestLogic();

  return (
    <>
      {initialValues && (
        <RequestForm
          type="edit"
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      )}
    </>
  );
};
