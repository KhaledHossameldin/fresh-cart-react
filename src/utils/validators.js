import * as Yup from "yup";

const name = Yup.string().required("Must enter a name");
const email = Yup.string()
  .required("Must enter an email")
  .email("Must be a valid email");
const phone = Yup.string()
  .required("Muster enter a phone number")
  .matches(/^(\+2)?01[0125][0-9]{8}$/, "Must enter a valid Egyptian number");
const password = Yup.string()
  .required("Must enter a password")
  .min(6, "Must be at least 6 characters");
const rePassword = Yup.string()
  .required("Must enter the password")
  .oneOf([Yup.ref("password")], "Must be equal to password");
const verifyCode = Yup.string()
  .required("Must enter a verification code")
  .length(6, "Must enter a complete verification code");
const details = Yup.string().required("Must enter details");
const city = Yup.string().required("Must enter a city");

export {
  name as nameSchema,
  email as emailSchema,
  phone as phoneSchema,
  password as passwordSchema,
  rePassword as rePasswordSchema,
  verifyCode as verifyCodeSchema,
  details as detailsSchema,
  city as citySchema,
};
