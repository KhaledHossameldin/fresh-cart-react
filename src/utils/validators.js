import * as Yup from "yup";

const email = Yup.string()
  .required("Must enter an email")
  .email("Must be a valid email");
const password = Yup.string()
  .required("Must enter a password")
  .min(6, "Must be at least 6 characters");

export { email as emailValidator, password as passwordValidator };
