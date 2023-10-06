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

// HR ROLE MANAGEMENT
export function hrCreateRolePosting(data) {
    return axiosClient.post("/create_role_posting", JSON.stringify(data));
  }

export function hrReadRolePosting(data) {
    return axiosClient.get("/hr_read_role_posting", JSON.stringify(data));
  }

export function hrReadRoleApplicants(data) {
    return axiosClient.get("/hr_read_role_applicant", JSON.stringify(data));
  }

export function updateRolePosting(data) {
    return axiosClient.delete("/update_role_posting", JSON.stringify(data));
  }

// STAFF
export function staffReadRoleListings(data) {
  return axiosClient.post("/staff_read_role_posting", JSON.stringify(data));
}

export function staffReadRoleSkillMatch(data) {
  return axiosClient.post("/staff_read_role_skill_match", JSON.stringify(data));
}

export function staffFilterRolePosting(data) {
  return axiosClient.get("/filter_role_posting", JSON.stringify(data));
}

export function staffCreateRoleApplication(data) {
  return axiosClient.delete("/create_role_application", JSON.stringify(data));
}
