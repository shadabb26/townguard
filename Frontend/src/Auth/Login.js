import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = `http://localhost:3000/api/v1/users`;

export async function loginUser(data) {
  const response = await axios.post(`${BASE_URL}/login`, data);
  if (response.data.token) localStorage.setItem("token", response.data.token);
  return response;
}

export function loginToast(response) {
  return new Promise((resolve, reject) => {
    if (response && response.status === 200) {
      toast("Login Successfull ! Redirecting...", {
        theme: "light",
        type: "success",
        position: "top-center",
        autoClose: 2000,
        onClose: resolve,
      });
    } else if (response && response.status === 400) {
      toast(response.data.message || "Bad Request", {
        theme: "light",
        type: "error",
        position: "top-center",
        autoClose: 2000,
        onClose: reject,
      });
    } else if (response && response.status === 401) {
      toast(response.data.message || "Unauthorized", {
        theme: "light",
        type: "error",
        position: "top-center",
        autoClose: 2000,
        onClose: reject,
      });
    }
  });
}
