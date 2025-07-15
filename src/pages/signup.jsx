import {useState} from 'react'
import InputFields from '../components/InputFields';
import AuthInputs from '../components/AuthInputs';
import axios from "axios";
const Signup = () => {
  /**
   * Define the main inputs of the sign up page
   */
  const [firstName, setFirstName]=useState('');
  const [lastName, setLastName]=useState('');
  const[password, setPassword]= useState('');
  const[confirmedPassword, setConfirmedPassword]=useState('');
  const [error,setError]=useState('');
  const[email,setEmail]=useState('');
  const[DOP,setDOP] = useState('');
  const [image,setImage] = useState('');
  const[isVerified , setIsVerfied]=useState(false);
  const[successMsg,setSuccessMsg]=useState('');

  const handleSignUP=async()=>{
    if(password !==confirmedPassword){
      setError("Password is not confirmed",error);
       return;
    }
    try {
      const response= await axios.post('http://localhost:3000/api/user',{
        firstName,
        lastName,
        password,
        confirmedPassword,
        email,
        image,
        DOP,
        isVerified,
      });

      if(response.status==201|| response.status==200){
        setSuccessMsg("User Created Successfully");

      }
    } catch (error) {
      if(error.response?.data?.message){
        setError(error.response?.data?.message);
      }
      else{
        setError("Something is wrong");
      }
    }
  }


  return (
    <>
    <div className="flex items-center justify-center bg-gray-200 py-8">
  <div className="bg-white p-6 rounded shadow-md w-96">
    <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">
      Sign up
    </h2>
       <InputFields label="Image URL" type="file" value={image} onChange={(e)=>setImage(e.target.value)}/>
    <InputFields label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <InputFields label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        
       <InputFields label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
       <InputFields label="Date of Birth" type="date" value={DOP} onChange={(e)=>setDOP(e.target.value)}/>
      <InputFields label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></InputFields>
      <InputFields label="Confirmed Password" type="password" value={confirmedPassword} onChange={(e)=>setConfirmedPassword(e.target.value)}></InputFields>
   
        <div className='mb-4'>
          <label className='flex items-center space-x-2'>
            <input type='checkbox' checked={isVerified} onChange={(e)=> setIsVerfied(e.target.checked)}/>
               <span className="text-sm text-gray-700">Verified Account</span>
          </label>
        </div>

   {error && <p className='text-red-500 mb-4'>{error}</p>}
{successMsg && <p className='text-green-500 mb-4'>{successMsg}</p>}
     <AuthInputs label="Create Button" onClick={handleSignUP}></AuthInputs>
     </div>

     </div>


    </>
  )
}

export default Signup