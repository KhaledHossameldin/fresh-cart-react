const baseUrl = "https://ecommerce.routemisr.com";
const login = `${baseUrl}/api/v1/auth/signin`;
const register = `${baseUrl}/api/v1/auth/signup`;
const forgetPassword = `${baseUrl}/api/v1/auth/forgotPasswords`;

export {
  login as loginUrl,
  register as registerUrl,
  forgetPassword as forgetPasswordUrl,
};
