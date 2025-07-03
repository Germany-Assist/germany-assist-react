import {React,useState} from 'react'
import InputFields from '../components/InputFields';
import AuthInputs from '../components/AuthInputs';
const Signup = () => {
  /**
   * Define the main inputs of the sign up page
   */
  const [userName, setUserName]=useState('');
  const[password, setPassword]= useState('');
  const[confirmedPassword, setConfirmedPassword]=useState('');
  const [error,setError]=useState('');
 
  
  const handleSignUP=()=>{
    if(password !==confirmedPassword){
      setError("Password is not confirmed",error);
       return;
    }
    setError('');
    console.log("User name value",{userName});
  }


  return (
    <div>
     <div className='min-h-screen flex item-center justify-center bg-gray-200'>
     <div className='bg-white p-8 rounded shadow-md w-96'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Sign up</h2>
      <InputFields label="UserName" type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}></InputFields>
      <InputFields label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></InputFields>
      <InputFields label="Confirmed Password" type="password" value={confirmedPassword} onChange={(e)=>setConfirmedPassword(e.target.value)}></InputFields>
       
   {error && <p className='text-red-500 mb-4'>{error}</p>}

     <AuthInputs label="Create Button" onClick={handleSignUP}></AuthInputs>
     </div>

     </div>


    </div>
  )
}

export default Signup