import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock } from "lucide-react";
import logo from "../assets/img/OL.jpg";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const errorMessage = login(email, password);
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center 
bg-gradient-to-r from-blue-100 via-slate-100 to-blue-200 px-4">
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">

        {/* Left Section */}
        <div className="md:w-1/2 w-full bg-gray-50 flex items-center justify-center relative overflow-hidden">

          <div className="w-80 h-80 bg-gray-100 rounded-full flex items-center justify-center relative shadow-inner">
            <div className="w-44 h-28 bg-slate-700 rounded-md flex items-center justify-center relative shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0"
                />
              </svg>

              <div className="absolute -bottom-3 w-52 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          <div className="absolute top-16 left-16 w-4 h-4 border-2 border-blue-400 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-4 h-4 border-2 border-green-400 rotate-45"></div>
          <div className="absolute top-20 right-20 w-4 h-4 border-2 border-gray-300"></div>
          <div className="absolute bottom-24 right-24 w-3 h-3 border-2 border-blue-400 rounded-full"></div>

        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center px-8 md:px-16 py-12">

          <img 
            src={logo} 
            alt="official liquidator" 
            className="text-2xl font-semibold text-gray-700 mb-8" 
          />

          {/* Email */}
          <div className="relative mb-5">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-full shadow-md"
          >
            LOGIN
          </button>

          {/* Error Message (Modern, No Popup) */}
          {error && (
            <div className="mt-4 text-sm bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;