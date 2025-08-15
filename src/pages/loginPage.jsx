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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Page</h2>

        <InputFields
          label="Email "
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputFields
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
