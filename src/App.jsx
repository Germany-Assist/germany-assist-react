
import './App.css'
import Signup from "./pages/signup";
import UserProfile from './pages/userProfile';
import DashboardHeader from './components/Dashboard/DashboardHeader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {ServiceList} from './components/Services/serviceList.jsx';

import ServiceDetails from './components/Services/ServiceDetails.jsx';
import LoginPage from './pages/loginPage.jsx';


function App() {


  return (
    <>
   
     <Router>
      <Routes>

        <Route path="/"  element={
          <>
        <DashboardHeader/>
          <div id="services">
        <ServiceList />
      </div>
        </>
        }></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/services" element={<ServiceList/>}></Route>
        <Route path="/userProfile" element={<UserProfile/>}></Route>
        <Route path="/serviceDetails/:slug" element={<ServiceDetails/>}></Route>

      </Routes>
     </Router>


     

     

    </>
    
  )
}

export default App
