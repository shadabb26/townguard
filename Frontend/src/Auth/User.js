import axios from "axios";
import { toast } from "react-toastify";
const USER_BASE_URL = `http://localhost:3000/api/v1/users`;

export async function getUserStats(token) {
  const response = await axios.get(`${USER_BASE_URL}/user-stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function submitContact(data) {
  const response = await axios.post(`${USER_BASE_URL}/contact`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export function contactSuccessToast() {
  toast("Contact request submitted !", {
    theme: "light",
    type: "success",
    autoClose: 2000,
    position: "top-center",
  });
}

export function contactErrorToast() {
  toast("Error! Please try afain later", {
    theme: "light",
    type: "error",
    autoClose: 2000,
    position: "top-center",
  });
}
