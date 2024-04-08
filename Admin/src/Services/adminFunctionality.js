import axios from "axios";
const BASE_URL_ISSUES = `http://localhost:3000/api/v1/issues`;
const BASE_URL_ADMIN = `http://localhost:3000/api/v1/admin`;

export async function getIssues(token) {
  try {
    const response = await axios.get(`${BASE_URL_ISSUES}`,{
      headers:{
        Authorization:`Bearer: ${token}`
      }
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getUsers(token) {
  try {
    const response = await axios.get(`${BASE_URL_ADMIN}/users`,{
      headers:{
        Authorization:`Bearer: ${token}`
      }
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}
export async function getAdmins(token) {
  try {
    const response = await axios.get(`${BASE_URL_ADMIN}/admins`,{
      headers:{
        Authorization:`Bearer: ${token}`
      }
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getResolvers(token) {
  try {
    const response = await axios.get(`${BASE_URL_ADMIN}/resolvers`,{
      headers:{
        Authorization:`Bearer: ${token}`
      }
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getStats(token) {
  try {
    const response = await axios.get(`${BASE_URL_ADMIN}/stats`,{
      headers:{
        Authorization:`Bearer: ${token}`
      }
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getAdminDetails(token) {
  try {
    const response = await axios.get(`${BASE_URL_ADMIN}/details`,{
      headers:{
        Authorization:`Bearer: ${token}`
      }
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getContactDetails(token) {
  try {
    const response = await axios.get(`${BASE_URL_ADMIN}/contact-details`,{
      headers:{
        Authorization:`Bearer: ${token}`
      }
    });
    console.log(response)
    return response;
  } catch (err) {
    console.log(err);
  }
}



