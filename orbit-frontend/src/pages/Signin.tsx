import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { OrbitIcon } from "../icons/OrbitIcon"
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL+"/api/v1/signin", {
            username,
            password    
        });
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        alert("Signin Successful!");
        navigate("/dashboard");
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
          <Input ref={usernameRef} placeholder="Username" />
          <Input ref={passwordRef} placeholder="Password"/>
        </div>

        <div className="w-full flex justify-center mt-6">
          <Button onClick={signin} variant="primary" text="Sign In"/>
        </div>
      </div>
    </div>
  );
}
