import Loading from "@/component/Loading";
import Login from "@/component/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    return <Login />;
  }
  if (session.status === "loading") {
    return <Loading />;
  }
  void router.push("/Dashboard");
}
