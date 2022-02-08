import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RequestService from "../../services/RequestService";
import { useModalContext } from "../../store/modal";
import { CreateRequestValues } from "../../typings/app";
import { FormHelper } from "../../utils/FormHelper";

export const useEditRequestLogic = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    actions: { openModal },
  } = useModalContext();
  const [initialValues, setInitialValues] = useState<CreateRequestValues>();

  useEffect(() => {
    if (!id) return;

    RequestService.get(id)
      .then((r) => {
        console.log(FormHelper.prepareApiRequestToEdit(r.data.data));
        setInitialValues(FormHelper.prepareApiRequestToEdit(r.data.data));
      })
      .catch((e) =>
        openModal({ message: "something went wrong, try again later" })
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (
    values: CreateRequestValues,
    { setSubmitting }: FormikHelpers<CreateRequestValues>
  ) => {
    try {
      if (!id) return;
      const dataToSend = FormHelper.prepareRequestToSend(values);

      await RequestService.update(id, dataToSend);

      navigate("/");
    } catch (e) {
      openModal({ message: "Something went wrong, try again later" });
      setSubmitting(false);
    }
  };

  return { handleSubmit, initialValues };
};
