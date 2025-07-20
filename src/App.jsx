
import './App.css'
import Signup from "./pages/signup";
import Login from './pages/login';
import DashboardHeader from './components/Dashboard/DashboardHeader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {ServiceList} from './components/Services/serviceList.jsx';
function App() {


  return (
    <>
    {/* <DashboardHeader/>
     */}
     <Router>
      <Routes>
        <Route path="/"  element={<DashboardHeader/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
     </Router>
    </>
  )
}

export default App
