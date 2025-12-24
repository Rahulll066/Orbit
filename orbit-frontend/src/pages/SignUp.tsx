import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { OrbitIcon } from "../icons/OrbitIcon";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await axios.post("/api/v1/signup", {
        username,
        password,
      });

      alert("Signup Successful!");
      navigate("/signin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup Failed! Try again.");
    }
  }

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-gray-200 px-4 py-8">
      <div className="bg-white rounded-lg border shadow-md w-full max-w-sm sm:max-w-md p-6 sm:p-8 flex flex-col items-center">
        
        {/* Logo */}
        <div className="flex items-center text-2xl sm:text-3xl font-bold text-[#efb100] mb-6">
          <div className="pr-1">
            <OrbitIcon />
          </div>
          Orbit
        </div>

        {/* Input Fields */}
        <div className="w-full space-y-3 sm:space-y-4">
          <Input ref={usernameRef} placeholder="Username" type="text" />
          <Input ref={passwordRef} placeholder="Password" type="password" />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-xs sm:text-sm mt-3 text-center">
            {error}
          </p>
        )}

        {/* Sign Up Button */}
        <div className="w-full flex justify-center mt-6">
          <Button onClick={signup} variant="primary" text="Sign Up" fullWidth/>
        </div>

        {/* Already Have Account */}
        <div className="mt-4 text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-[#efb100] font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
}

