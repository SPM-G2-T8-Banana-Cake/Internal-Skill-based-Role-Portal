import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.scss';
import NotFound from "./utils/NotFound";

// HR
import Login from "./pages/Login";
import HrHome from "./pages/HR/Home";
import RolesManagement from "./pages/HR/RolesManagement/RolesManagement";
import CreateRoleListing from "./pages/HR/RolesManagement/CreateRoleListing";
import ApplicationsManagement from "./pages/HR/ApplicationsManagement/ApplicationsManagement";
import HRAuth from "./utils/HRAuth";

// STAFF
import StaffHome from "./pages/Staff/Home";
import ViewRoleListings from "./pages/Staff/RolesPage";
import StaffAuth from "./utils/StaffAuth"

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        {/* HR  */}
        <Route path="/hr-home" element={<HRAuth><HrHome /></HRAuth>} />
        <Route path="/roles-management" element={<HRAuth><RolesManagement /></HRAuth>} />
        <Route path="/create-role-listing" element={<HRAuth><CreateRoleListing /></HRAuth>} />
        <Route path="/applications-management" element={<HRAuth><ApplicationsManagement /></HRAuth>} />

        {/* Staff  */}
        <Route path="/staff-home" element={<StaffAuth><StaffHome /></StaffAuth>} />
        <Route path="/available-roles" element={<StaffAuth><ViewRoleListings /></StaffAuth>} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
