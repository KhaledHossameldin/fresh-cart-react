const baseUrl = "https://ecommerce.routemisr.com";
const login = `${baseUrl}/api/v1/auth/signin`;
const register = `${baseUrl}/api/v1/auth/signup`;
const forgetPassword = `${baseUrl}/api/v1/auth/forgotPasswords`;
const verifyCode = `${baseUrl}/api/v1/auth/verifyResetCode`;
const resetPassword = `${baseUrl}/api/v1/auth/resetPassword`;
const categories = `${baseUrl}/api/v1/categories`;
const products = `${baseUrl}/api/v1/products`;
const cart = `${baseUrl}/api/v1/cart`;
const orders = `${baseUrl}/api/v1/orders`;
const brands = `${baseUrl}/api/v1/brands`;
const wishlist = `${baseUrl}/api/v1/wishlist`;

const productDetails = (id) => `${baseUrl}/api/v1/products/${id}`;

export {
  login as loginUrl,
  register as registerUrl,
  forgetPassword as forgetPasswordUrl,
  verifyCode as verifyCodeUrl,
  resetPassword as resetPasswordUrl,
  categories as categoriesUrl,
  products as productsUrl,
  cart as cartUrl,
  orders as ordersUrl,
  brands as brandsUrl,
  wishlist as wishlistUrl,
  productDetails as productDetailsUrl,
};
