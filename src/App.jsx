import "./App.css";

import About from "./pages/about";
import OnboardingPage from "./pages/onboarding";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/HomePage.jsx";
import MainNav from "./components/Homepage/MainNav.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ServicePage from "./pages/service/ServicePage.jsx";
import AuthPortal from "./features/auth/AuthProtal.jsx";
import Services from "./pages/service/Services.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/onboarding" element={<OnboardingPage />}></Route>
      <Route path="/auth" element={<AuthPortal />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route
        path="/service/:serviceId"
        element={
          <>
            <MainNav />
            <ServicePage />
          </>
        }
      />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
