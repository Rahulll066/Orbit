import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { OrbitIcon } from "../icons/OrbitIcon"
import { useRef,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error,setError] = useState(false);

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try{
          const response = await axios.post("/api/v1/signin", {
            username,
            password    
        });
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        alert("Signin Successful!");
        navigate("/dashboard");
        }
        catch(err){
          setError(true);
          alert("Signin Failed! Please check your credentials.");
        }
    }

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-gray-200 px-4 py-8">
      <div className="bg-white rounded-lg border shadow-md w-full max-w-sm sm:max-w-md p-6 sm:p-8 flex flex-col items-center">
        <div className="flex items-center text-2xl sm:text-3xl font-bold text-[#efb100] mb-6">
          <div className="pr-1">
            <OrbitIcon />
          </div>
          Orbit
        </div>

        <div className="w-full space-y-3 sm:space-y-4">
          <Input ref={usernameRef} placeholder="Username" type="text" />
          <Input ref={passwordRef} placeholder="Password" type="password"/>
        </div>

        {error && (
          <p className="text-red-500 text-xs sm:text-sm mt-3 text-center">
            {error}
          </p>
        )}

        <div className="w-full flex justify-center mt-6">
          <Button onClick={signin} variant="primary" text="Sign In" fullWidth/>
        </div>
      </div>
    </div>
  );
}
