import * as Yup from "yup";

export const useRequestFormLogic = () => {
  const baseValidationSchema = Yup.object().shape({
    url: Yup.string().url("Must be valid url").required("Required"),
    method: Yup.string().required("Required"),
  });

  return { baseValidationSchema };
};
