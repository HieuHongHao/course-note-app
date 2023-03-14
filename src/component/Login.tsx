import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";


export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="inline-flex">
        <button className="btn text-slate-900 font-bold" onClick={() => void signIn("google")}>
          <FcGoogle className="mr-2 h-12"/>
          Sign with Google
        </button>
      </div>
    </div>
  );
} 
