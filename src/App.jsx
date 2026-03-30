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
import JobsPage from "./pages/JobsPage.jsx";
import ClientDisputes from "./features/Dashboard/tabs/client/ClientDisputes.jsx";
import SPDisputes from "./features/Dashboard/tabs/serviceProvider/SPDisputes"; 
import DisputeDetails from "./features/Dashboard/tabs/serviceProvider/DisputeDetails.jsx";
import SPDisputeResponse from "./features/Dashboard/tabs/serviceProvider/SPDisputeResponse.jsx";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/auth" element={<AuthPortal />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/disputes" element={<ClientDisputes />} />
        <Route path="/sp/disputes" element={<SPDisputes />} />
        <Route path="/disputes/:id" element={<DisputeDetails />} />
        <Route path="/service/:serviceId" element={<ServiceProfile />} />
        <Route path="/disputes/respond/:id" element={<SPDisputeResponse />} />
        <Route path="/timeline/:timelineId" element={<TimelinePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
