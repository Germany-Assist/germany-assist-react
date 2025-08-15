
import { React, useState } from "react";
import InputFields from "../components/InputFields";
import AuthInputs from "../components/AuthInputs";
import { AuthContext, useAuth } from "./AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );


      if (response.status === 200) {
        login(response.data.accessToken, response.data.user);
        toast.success("User login successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Try again!");
    }
  };

  return (

export default LoginPage;

