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

// LOGIN
export function hrCreateAccount(data) {
  return axiosClient.post("/create_hr_user", JSON.stringify(data));
}

export function staffCreateAccount(data) {
  return axiosClient.post("/create_staff_user", JSON.stringify(data));
}

export function hrLoginAccount(data) {
  return axiosClient.post("/hr_log_in", JSON.stringify(data));
}

export function staffLoginAccount(data) {
  return axiosClient.post("/staff_log_in", JSON.stringify(data));
}

// HR ROLE MANAGEMENT
export function hrCreateRoleListing(data) {
    return axiosClient.post("/create_role_listing", JSON.stringify(data));
  }

export function hrReadRoleListings() {
    return axiosClient.get("/hr_view_role_listings");
  }

export function hrUpdateRoleListing(data) {
    return axiosClient.put("/update_role_listings", JSON.stringify(data))
}

export function hrReadRoleApplicants() {
    return axiosClient.get("/view_applicants_skills");
  }

export function hrDeleteRoleListing(data) {
  return axiosClient.delete("/delete_role_listing" + (data));
}

// STAFF
export function staffReadRoleListings(data) {
  return axiosClient.post("/staff_view_role_listings", JSON.stringify(data));
}

export function staffCreateRoleApplication(data) {
    return axiosClient.put("/create_role_application", JSON.stringify(data));
}