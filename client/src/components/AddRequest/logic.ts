import { FormikHelpers } from "formik";
import RequestService from "../../services/RequestService";
import { useModalContext } from "../../store/modal";
import { CreateRequestValues } from "../../typings/app";
import { FormHelper } from "../../utils/FormHelper";

export const useAddRequestLogic = () => {
  const {
    actions: { openModal },
  } = useModalContext();

  const initialValues = {
    url: "",
    headers: [],
    body: [],
    method: "",
    type: "once",
    execOptions: [
      {
        date: new Date(),
      },
    ],
  } as CreateRequestValues;

  const handleSubmit = async (
    values: CreateRequestValues,
    { setSubmitting, resetForm }: FormikHelpers<CreateRequestValues>
  ) => {
    try {
      const dataToSend = FormHelper.prepareRequestToSend(values);

      await RequestService.create(dataToSend);

      setSubmitting(false);
      resetForm();
    } catch (e) {
      openModal({ message: "Something went wrong, try again later" });
      setSubmitting(false);
    }
  };

  return { initialValues, handleSubmit };
};
