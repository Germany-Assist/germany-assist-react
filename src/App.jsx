
import './App.css'
import Signup from "./pages/signup";
import UserProfile from './pages/userProfile';
import About from './pages/about';
import Jobs from './pages/jobs';
import OnboardingPage from './pages/onboarding';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ServiceList} from './components/Services/serviceList.jsx';
import Homepage from './components/Homepage/Homepage.jsx';
import ServiceDetails from './components/Services/ServiceDetails.jsx';
import Login from './pages/login.jsx';
import { HeaderWithAlert } from './components/Dashboard/HeaderWithAlert.jsx';

function App() {
  return (
    <Router>
      <Routes>
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
        <Route path="/onboarding" element={<OnboardingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/services" element={
          <>
            <HeaderWithAlert />
            <ServiceList />
          </>
        }></Route>
        <Route path="/userProfile" element={<UserProfile />}></Route>
        <Route path="/serviceDetails/:slug" element={<ServiceDetails />}></Route>
      </Routes>
    </Router>
  );
}

export default App
