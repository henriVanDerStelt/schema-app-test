import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./Pages/Index/Index";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/schema-app-test/" element={<Index />} />
        <Route path="/schema-app-test/login" element={<Login />} />
        <Route path="/schema-app-test/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
