import axios from "axios";

const baseURL = `http://127.0.0.1:5000/`

const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });


axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401) {
        window.location.href = "http://localhost:3000/";
      }
      console.error(error);
      return Promise.reject(error);
    }
  );

// ROLE MANAGEMENT
export function createRolePosting(data) {
    return axiosClient.post("/create_role_posting", JSON.stringify(data));
  }