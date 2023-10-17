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

// STAFF
import StaffHome from "./pages/Staff/Home";
import ViewRoleListings from "./pages/Staff/RolesPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        {/* HR  */}
        <Route path="/hr-home" element={<HrHome />} />
        <Route path="/roles-management" element={<RolesManagement />} />
        <Route path="/create-role-listing" element={<CreateRoleListing />} />
        <Route path="/applications-management" element={<ApplicationsManagement />} />
        {/* Staff  */}
        <Route path="/staff-home" element={<StaffHome />} />
        <Route path="/available-roles" element={<ViewRoleListings />} />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
