import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.scss';
import Login from "./pages/Login";
import CreateRoleListing from "./pages/HR/CreateRoleListing";

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-role-listing" element={<CreateRoleListing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
