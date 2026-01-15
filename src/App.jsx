import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ServiceProfile from "./features/service/serviceProfile/ServiceProfile.jsx";
import AuthPortal from "./features/auth/AuthPortal.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import TimelinePage from "./pages/TimelinePage.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth" element={<AuthPortal />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service/:serviceId" element={<ServiceProfile />} />
        <Route path="/timeline/:timelineId" element={<TimelinePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
