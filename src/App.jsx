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
import { StripeContainer } from "./components/Payment/StripeContainer.jsx";
import { TimelinePage } from "./components/ServiceTimeLine/TimelinePage.jsx";
import BusinessProvider from "./components/Buisnesses/BusinessProvider.jsx";
import { TimelineForm } from "./components/ServiceTimeLine/TimelineForm.jsx";
import { CreatePostForm } from "./components/ServiceTimeLine/CreatePostForm.jsx";
import { ServiceTimelineClient } from "./components/ServiceTimeLine/ServiceTimelineClient.jsx";
import MainNav from "./components/Homepage/MainNav.jsx";
import DashboardPanel from "./pages/dashboards/DashboardPanel.jsx";
//TODO temp disable for unification to be updated and moved and refactored
// import AdminDashboard from "./components/Dashboard/AdminDashboard.jsx";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <MainNav />
            <Homepage />
          </>
        }
      ></Route>
      <Route
        path="/about"
        element={
          <>
            <MainNav />
            <About />
          </>
        }
      ></Route>
      <Route
        path="/jobs"
        element={
          <>
            <MainNav />
            <Jobs />
          </>
        }
      ></Route>
      <Route
        path="/serviceDetails/:id"
        element={
          <>
            <MainNav />
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
            <MainNav />
            <ServiceList />
          </>
        }
      ></Route>
      <Route
        path="/userProfile"
        element={
          <>
            <MainNav />
            <UserProfile />
          </>
        }
      ></Route>
      <Route
        path="/userProviderProfile"
        element={
          <>
            <MainNav />
            <BusinessProvider />
          </>
        }
      ></Route>
      <Route
        path="/serviceTimeline/:serviceId"
        element={
          <>
            <MainNav />
            <TimelinePage />
          </>
        }
      ></Route>
      <Route
        path="/provider/services/:id/timeline/new"
        element={
          <>
            <MainNav />
            <TimelineForm />
          </>
        }
      />
      <Route
        path="/client/services/timeline"
        element={
          <>
            <MainNav />
            <ServiceTimelineClient />
          </>
        }
      />

      <Route
        path="/provider/services/:serviceId/post"
        element={
          <>
            <MainNav />
            <CreatePostForm />
          </>
        }
      />
      <Route
        path="/checkout/:serviceId"
        element={
          <>
            <MainNav />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <StripeContainer />
            </div>
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <>
            <DashboardPanel />
          </>
        }
      />{" "}
    </Routes>
  );
}

export default App;
