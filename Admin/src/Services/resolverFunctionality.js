import axios from "axios";

const BASE_URL_ISSUES = `http://localhost:3000/api/v1/issues/`;
const BASE_URL_RESOLVER = `http://localhost:3000/api/v1/resolver`;

export async function getIssues(token) {
  try {
    const response = await axios.get(`${BASE_URL_ISSUES}`, {
      headers: {
        Authorization: `Bearer: ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getStats(token) {
  try {
    const response = await axios.get(`${BASE_URL_RESOLVER}/stats`, {
      headers: {
        Authorization: `Bearer: ${token}`,
      },
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getResolverDetails(token) {
  try {
    const response = await axios.get(`${BASE_URL_RESOLVER}/details`, {
      headers: {
        Authorization: `Bearer: ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}
export async function getOneIssue(token, id) {
  const response = await axios.get(`${BASE_URL_ISSUES}/getById`, {
    params: {
      id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function rejectIssue(token, reason, id) {
  const data = { reason, id };
  const response = await axios.patch(`${BASE_URL_RESOLVER}/reject`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function resolveIssue(token, data, id) {
  const formData = new FormData();
  formData.append("resolveImg", data.resolveImg[0]);
  formData.append("token", token);
  formData.append("id", id);

  const response = await axios.patch(`${BASE_URL_RESOLVER}/resolve`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
  return response;
}

export async function noOfIssuesSolved() {
  const response = axios.get(`${BASE_URL_RESOLVER}/issues-solved`);
  return response;
}
