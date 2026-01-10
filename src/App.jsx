import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage.jsx";
import About from "./pages/about";
import DashboardPage from "./pages/DashboardPage.jsx";
import ServiceProfile from "./features/service/serviceProfile/ServiceProfile.jsx";
import AuthPortal from "./features/auth/AuthPortal.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import TimelinePage from "./pages/TimelinePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth" element={<AuthPortal />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/service/:serviceId" element={<ServiceProfile />} />
      <Route path="/timeline/:timelineId" element={<TimelinePage />} />
    </Routes>
  );
}

export default App;
