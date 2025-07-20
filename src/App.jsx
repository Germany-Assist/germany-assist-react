
import './App.css'
import Signup from "./pages/signup";
import Login from './pages/login';
import {ServiceList} from './components/Services/serviceList.jsx';
function App() {


  return (
    <>
    {/* <h1>Hello I am Muna</h1>
      <Signup />
      <Login /> 
      <div className="bg-blue-500 text-white p-4 w-300">
      Tailwind Test Works!
    </div> */}
    <ServiceList></ServiceList>
    </>
  )
}

export default App
