import { React, useState } from "react";
import InputFields from "../components/InputFields";
import AuthInputs from "../components/AuthInputs";
import { AuthContext, useAuth } from "./AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { API_URL } from '../config/api';
const LoginPage = () => {
  const[email,setEmail]= useState('');
  const[password,setPassword] = useState('');


  const {login}= useAuth();
  const[loading,setLoading]=useState(false);
const handleLogin = async () => {
  if (!email || !password) {
    toast.error("Please fill in both fields");
    return;
  }

  
  let emailToSend = email;
  if (!email.includes("@")) {
    emailToSend = `${email}@dummy.com`; 
  }

  setLoading(true);
  try {
    const response = await axios.post(
      `${API_URL}/api/user/login`,
      {
        email: emailToSend,
        password
      },
      { withCredentials: true }
    );

    console.log("Login response:", response.data);
    console.log("Access token:", response.data.accessToken);
    console.log("User object:", response.data.user);

    if (response.status === 200) {
      login(response.data.accessToken, response.data.user);
      toast.success("User login successfully");
    }

    let emailToSend = email;
    if (!email.includes("@")) {
      emailToSend = `${email}@dummy.com`;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/user/login`,
        {
          email: emailToSend,
          password,
        },
        { withCredentials: true }
      );

      console.log("Login response:", response.data);
      console.log("Access token:", response.data.accessToken);
      console.log("User object:", response.data.user);

      if (response.status === 200) {
        login(response.data.accessToken, response.data.user);
        toast.success("User login successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed. Try again!");
    } finally {
      setLoading(false);
    }
  }};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Page</h2>



        <AuthInputs
          label={loading ? "Logging in..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default LoginPage;
