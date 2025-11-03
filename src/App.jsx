import "./App.css";
import Signup from "./pages/signup";
import Login from './pages/login';
import About from './pages/about';
import Jobs from './pages/jobs';
import OnboardingPage from './pages/onboarding';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserProfile from "./components/Candidate/userProfile.jsx";
import {ServiceList} from './components/Services/serviceList.jsx';
import Homepage from './components/Homepage/Homepage.jsx';
import ServiceDetails from './components/Services/ServiceDetails.jsx';
import Login from './pages/login.jsx';
>>>>>>> ccdf717 (Integrating API with Sign up and Login Page (#24))
import { HeaderWithAlert } from './components/Dashboard/HeaderWithAlert.jsx';
import { StripeContainer } from "./components/Payment/StripeContainer.jsx";

function App() {
  return (
 
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DashboardHeader />
              <Homepage />
            </>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <>
              <DashboardHeader />
              <About />
            </>
          }
        ></Route>
        <Route
          path="/jobs"
          element={
            <>
              <DashboardHeader />
              <Jobs />
            </>
          }
        ></Route>
        <Route
          path="/serviceDetails/:id"
          element={
            <>
              <DashboardHeader />
              <ServiceDetails />
            </>
          }
        ></Route>
        <Route path="/" element={
          <>
            <HeaderWithAlert />
            <Homepage />
          </>
        } ></Route>
        <Route path="/about" element={
          <>
            <HeaderWithAlert />
            <About />
          </>
        } ></Route>
        <Route path="/jobs" element={
          <>
            <HeaderWithAlert />
            <Jobs />
          </>
        } ></Route>
        <Route path="/serviceDetails/:id" element={
          <>
            <HeaderWithAlert />
            <ServiceDetails />
          </>
        } ></Route>
        <Route path="/onboarding" element={<OnboardingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/services"
          element={
            <>
              <DashboardHeader />
              <ServiceList />
            </>
          }
        ></Route>
        <Route path="/services" element={
          <>
            <HeaderWithAlert />
            <ServiceList />
          </>
        }></Route>
        <Route path="/userProfile" element={
          <>
           <HeaderWithAlert />
          <UserProfile />
          </>}></Route>

           <Route
          path="/payment"
          element={
            <>
              <HeaderWithAlert />
              <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <StripeContainer />
              </div>
            </>
          }
        ></Route>
      </Routes>
    
  );
}

export default App;
