/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const session = useSession();
  return (
    <div className="navbar m-5 w-auto rounded-lg border-2 border-slate-200 bg-slate-50">
      <a className="btn-ghost btn text-lg normal-case  text-slate-700 hover:border-none hover:bg-slate-300">
        Home
      </a>
      <span className="ml-auto text-lg font-semibold text-slate-700">
        {session.data?.user.name}
      </span>
      <img
        src={session.data?.user.image as string}
        alt=""
        className="avatar ml-5 w-11 rounded-full"
      />
      <a className="btn-ghost btn ml-3 text-lg normal-case text-slate-700 hover:border-none hover:bg-slate-300">
        Menu
      </a>
      <a
        className="btn-ghost btn ml-1 text-lg normal-case text-slate-700 hover:border-none hover:bg-slate-300"
        onClick={() => void signOut({ callbackUrl: "http://localhost:3000" })}
      >
        Sign out
      </a>
    </div>
  );
}
