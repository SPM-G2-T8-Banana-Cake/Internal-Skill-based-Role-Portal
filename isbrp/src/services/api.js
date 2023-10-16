import axios from "axios";

const baseURL = `http://127.0.0.1:5000/`

const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
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
export function hrCreateRoleListing(data) {
    return axiosClient.post("/create_role_listing", JSON.stringify(data));
  }

export function hrReadRoleListings() {
    return axiosClient.get("/view_role_listings");
  }

export function hrUpdateRoleListing(data) {
    return axiosClient.put("/update_role_listings", JSON.stringify(data))
}

export function hrReadRoleApplicants() {
    return axiosClient.get("/view_applicant_skills");
  }

// STAFF
export function staffReadRoleSkillMatch(data) {
  return axiosClient.post("/get_matched_skills", JSON.stringify(data))
}

export function staffCreateRoleApplication(data) {
    return axiosClient.put("/create_role_application", JSON.stringify(data));
}