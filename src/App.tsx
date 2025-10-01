import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Index from "./Pages/Index/Index";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Router>
          <div className="app-layout">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/schema-app-test/" element={<Index />} />
                <Route path="/schema-app-test/login" element={<Login />} />
                <Route
                  path="/schema-app-test/dashboard"
                  element={<Dashboard />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ClerkProvider>
    </>
  );
}

export default App;
