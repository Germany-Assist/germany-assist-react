import {React,useState} from 'react'
import InputFields from '../components/InputFields';
import AuthInputs from '../components/AuthInputs';
const Login = () => {
  const[userName,setUserName]= useState('');
  const[password,setPassword] = useState('');
  const[error,setError] = useState('');

  /**
   * Use this function later withAPI
   */

   const handleLogin=()=>{
    console.log("The value of the username",userName);
   }
  return (
    
    <div>
     <div className='min-h-screen flex items-center justify-center bg-gray-100'>
     <div className='bg-white p-8 rounded shadow-md w-96'>
     <h2 className='text-2xl font-bold mb-6 text-center'>
     Login Page
     </h2>
      <InputFields label="User Name" type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
      <InputFields label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <AuthInputs label="Login" onClick={handleLogin}/>
     </div>

     </div>
    </div>
  )
}

export default Login