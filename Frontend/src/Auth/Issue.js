import axios from "axios";
import { toast } from "react-toastify";
const ISSUE_BASE_URL = `http://localhost:3000/api/v1/issues/`;


export async function submitIssue(data, token) {
  console.log("Data from function:", data);

  const { title, description, imageOne, imageTwo, city, street } = data;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("imageOne", imageOne[0]);
  formData.append("imageTwo", imageTwo[0]);
  formData.append("city", city);
  formData.append("street", street);
  formData.append("latitude", data.latitude);
  formData.append("longitude", data.longitude);

  console.log("Form Data:", formData);

  try {
    const response = await axios.post(ISSUE_BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    console.log("Response:", response.data);

    return response;
  } catch (error) {
    console.error("Error submitting issue:", error);
  }
}

export async function getIssueByUser(token) {
  const response = await axios.get(`${ISSUE_BASE_URL}/getIssueByUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function getOneIssue(token, id) {
  const response = await axios.get(`${ISSUE_BASE_URL}/getById`, {
    params: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export function issueToast(response) {
  if (response.data.status === "success")
    toast("Issue Raised", {
      theme: "light",
      type: "success",
      position: "top-center",
      autoClose: 2000,
    });
  else {
    toast("Issue Raised", {
      theme: "light",
      type: "success",
      position: "top-center",
      autoClose: 2000,
    });
  }
}


