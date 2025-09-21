
import './App.css'
import Signup from "./pages/signup";
import UserProfile from './pages/userProfile';
import About from './pages/about';
import Jobs from './pages/jobs';
import OnboardingPage from './pages/onboarding';
import DashboardHeader from './components/Dashboard/DashboardHeader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {ServiceList} from './components/Services/serviceList.jsx';
import Homepage from './components/Homepage/Homepage.jsx';
import ServiceDetails from './components/Services/ServiceDetails.jsx';
import LoginPage from './pages/loginPage.jsx';
import BusinessProvider from './components/Buisnesses/BusinessProvider.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <DashboardHeader />
            <Homepage />
          </>
        } ></Route>
        <Route path="/about" element={
          <>
            <DashboardHeader />
            <About />
          </>
        } ></Route>
        <Route path="/jobs" element={
          <>
            <DashboardHeader />
            <Jobs />
          </>
        } ></Route>
        <Route path="/onboarding" element={<OnboardingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/services" element={
          <>
            <DashboardHeader />
            <ServiceList />
          </>
        }></Route>
        <Route path="/userProfile" element={<UserProfile />}></Route>
        <Route path="/serviceDetails/:id" element={<ServiceDetails />}></Route>
      </Routes>
    </Router>
  );
}

export default App
