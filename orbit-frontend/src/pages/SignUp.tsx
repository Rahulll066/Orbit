import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { OrbitIcon } from "../icons/OrbitIcon"
import { useRef,useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error,setError] = useState(false);

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try{
          await axios.post(BACKEND_URL+"/api/v1/signup", {
            username,
            password    
        });
        alert("Signup Successful!");
        navigate("/signin");
        }catch(err){
          setError(true);
          alert("Signup Failed! Please try again.");
        }
    }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white rounded-lg border shadow-md w-80 p-8 flex flex-col items-center">
        <div className="flex items-center text-3xl font-bold text-[#efb100] mb-6 pr-6">
          <div className="pr-1">
            <OrbitIcon />
          </div>
          Orbit
        </div>

        <div className="w-full space-y-4">
          <Input ref={usernameRef} placeholder="Username" type="text" />
          <Input ref={passwordRef} placeholder="Password" type="password" />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {error}
          </p>
        )}

        <div className="w-full flex justify-center mt-6">
          <Button onClick={signup} variant="primary" text="Sign Up"/>
        </div>
      </div>
    </div>
  );
}
