import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/login";
import About from "./pages/about";
import Jobs from "./pages/jobs";
import OnboardingPage from "./pages/onboarding";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserProfile from "./components/Candidate/userProfile.jsx";
import { ServiceList } from "./components/Services/serviceList.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import ServiceDetails from "./components/Services/ServiceDetails.jsx";
import { HeaderWithAlert } from "./components/Dashboard/HeaderWithAlert.jsx";
import { StripeContainer } from "./components/Payment/StripeContainer.jsx";

// to delete just for deployment testing
setInterval(async () => {
  try {
    console.log("Testing backend connection v5");

    const res = await fetch("backend/health");
    const healthData = await res.json();
    console.log("Health response:", healthData);

    const res2 = await fetch("backend/api/service");
    const serviceData = await res2.json(); // parse JSON
    console.log("Service response:", serviceData);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}, 10000);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <HeaderWithAlert />
            <Homepage />
          </>
        }
      ></Route>
      <Route
        path="/about"
        element={
          <>
            <HeaderWithAlert />
            <About />
          </>
        }
      ></Route>
      <Route
        path="/jobs"
        element={
          <>
            <HeaderWithAlert />
            <Jobs />
          </>
        }
      ></Route>
      <Route
        path="/serviceDetails/:id"
        element={
          <>
            <HeaderWithAlert />
            <ServiceDetails />
          </>
        }
      ></Route>
      <Route path="/onboarding" element={<OnboardingPage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route
        path="/services"
        element={
          <>
            <HeaderWithAlert />
            <ServiceList />
          </>
        }
      ></Route>
      <Route
        path="/userProfile"
        element={
          <>
            <HeaderWithAlert />
            <UserProfile />
          </>
        }
      ></Route>

      <Route
        path="/checkout/:serviceId"
        element={
          <>
            <HeaderWithAlert />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <StripeContainer />
            </div>
          </>
        }
      />
    </Routes>
  );
}

export default App;
