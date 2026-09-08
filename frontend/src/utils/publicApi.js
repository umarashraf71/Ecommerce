import axios from "axios";

const publicApi = axios.create({
  baseURL: "https://ecommerce-psi-two-69.vercel.app/api",
});

export default publicApi;