import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.scss';
import Login from "./pages/Login";
import HrHome from "./pages/HR/Home";
import RolesManagement from "./pages/HR/RolesManagement/RolesManagement";
import CreateRoleListing from "./pages/HR/RolesManagement/CreateRoleListing";


function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HrHome />} />
        <Route path="/roles-management" element={<RolesManagement />} />
        <Route path="/create-role-listing" element={<CreateRoleListing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
