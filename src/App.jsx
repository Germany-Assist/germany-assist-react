
import './App.css'
import Signup from "./pages/signup";
import Login from './pages/login';
import UserProfile from './pages/userProfile';
import DashboardHeader from './components/Dashboard/DashboardHeader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {ServiceList} from './components/Services/serviceList.jsx';
function App() {


  return (
    <>
   
     <Router>
      <Routes>
        <Route path="/"  element={<DashboardHeader/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/services" element={<ServiceList/>}></Route>
        <Route path="/userProfile" element={<UserProfile/>}></Route>
      </Routes>
     </Router>


     
       <div id="services">
        <ServiceList />
      </div>
    </>
    
  )
}

export default App
