import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
  withXSRFToken: true,
});

export default instance;
