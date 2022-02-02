import * as Yup from "yup";

export const useRequestFormLogic = () => {
  const validationSchema = Yup.object().shape({
    url: Yup.string().url("Must be valid url").required("Required"),
    method: Yup.string().required("Required"),
    // headers: Yup.string(),
    // body: Yup.string(),
  });

  return { validationSchema };
};
