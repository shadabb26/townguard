import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = `http://localhost:3000/api/v1/admin`;

export async function signupUser(data) {
  console.log(data);
  const response = await axios.post(`${BASE_URL}`, data);
  return response;
}

export function signupToast(response) {
  return new Promise((resolve, reject) => {
    if (response && response.status === 201) {
      toast("Account Created..", {
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
    }
  });
}
