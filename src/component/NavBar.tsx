/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const session = useSession();
  return (
    <div className="navbar m-5 w-full ml-2 rounded-lg border-2 border-slate-200 bg-white">
      <a className="btn-ghost btn text-lg normal-case text-slate-700 hover:border-none hover:bg-slate-200">
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
      <a className="btn-ghost btn ml-3 text-lg normal-case text-slate-700 hover:border-none hover:bg-slate-200">
        Menu
      </a>
      <a
        className="btn-ghost btn ml-1 text-lg normal-case text-slate-700 hover:border-none hover:bg-slate-200"
        onClick={() => void signOut({ callbackUrl: "http://localhost:3000" })}
      >
        Sign out
      </a>
    </div>
  );
}
