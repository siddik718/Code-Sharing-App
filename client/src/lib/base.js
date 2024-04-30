import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    Authorization: "Bearer " + localStorage.getItem('token'),
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default instance;
