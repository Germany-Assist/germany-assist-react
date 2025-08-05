import { useState } from "react";
import InputFields from "../components/InputFields";
import AuthInputs from "../components/AuthInputs";
import axios from "axios";
import { useAuth } from "./AuthProvider";
import { ValidateSignUPInputs } from "../components/ValidateSignUPInputs";
const Signup = () => {
  /**
   * Define the main inputs of the sign up page
   */
  const { login } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [DOP, setDOP] = useState("");
  const [image, setImage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignUP = async () => {
    const validates = ValidateSignUPInputs({
      firstName,
      lastName,
      image,
      DOP,
      password,
      confirmedPassword,
      email,
    });

    if (validates.length > 0) {
      setError(validates.join("\n"));
      console.warn("Validation is error", validates);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user",
        {
          firstName,
          lastName,
          password,
          confirmedPassword,
          email,
          image,
          DOP,
          isVerified,
        },
        {
          withCredentials: true,
        }
      );

      console.log("the value of response", response.data);

      if (response.status == 201 || response.status == 200) {
        login(response.data.accessToken, response.data.user);
        setSuccessMsg("User Created Successfully");
        console.log("data  of the user", response.data.user);
        console.log("data  of token", response.data.accessToken);
      }
    } catch (err) {
      const backendError =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.message ||
        "Something went wrong";
      setError(backendError);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Sign Up
        </h2>
        <div className="flex flex-col items-center mb-6">
          {/* Image Profile */}

          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden shadow-2xl mb-2">
            {image ? (
              <img
                src={image}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Paste Image URL"
            className="border border-gray-400 rounded px-3 py-2 w-full text-sm"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {/* User Info fields */}

        <InputFields
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputFields
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputFields
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputFields
          label="Date of Birth"
          type="date"
          value={DOP}
          onChange={(e) => setDOP(e.target.value)}
        />
        <InputFields
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputFields
          label="Confirm Password"
          type="password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-900">Verified Account</span>
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

        <AuthInputs label="Create Account" onClick={handleSignUP} />
      </div>
    </div>
  );
};

export default Signup;
