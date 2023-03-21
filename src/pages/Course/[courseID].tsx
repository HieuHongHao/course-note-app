/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { RefObject, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

export default function CoursePage() {
  const router = useRouter();
  const { courseID } = router.query;
  const chatContainer = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    chatContainer.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }

  useEffect(() => {
    scrollToBottom();
  },[])
  return (
    <div className="flex h-screen flex-row">
      <div className="flex h-max min-h-full w-7/12 flex-col border-r-2 border-r-slate-200">
        {courseID}
      </div>
      <div
        className="flex h-max min-h-full w-5/12 flex-col border-r-2 border-r-slate-200"
        ref={chatContainer}
      >
        <button
          className="m-5 w-max rounded-md bg-sky-200 p-2 font-semibold text-sky-600"
          onClick={() => scrollToBottom()}
        >
          Scroll to latest chat
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
          return <Chat key={num} />;
        })}
      </div>
    </div>
  );
}

const Chat = () => {
  const session = useSession();
  const hasSessionAndUser = session.data && session.data.user;
  if (!hasSessionAndUser) {
    return <div className="m-auto text-slate-900">Error</div>;
  }
  return (
    <div className="m-5 flex h-max flex-col rounded-lg bg-white">
      <div className="ml-5 mt-5 flex flex-row ">
        {session.data.user.image && (
          <img
            src={session.data.user.image}
            className="h-6 w-6 rounded-full object-cover"
            alt="usernimg"
          />
        )}
        {session.data.user.name && (
          <div className="ml-3 font-semibold text-slate-700">
            {session.data.user.name}
          </div>
        )}
      </div>

      <div className="ml-14 mt-1 mb-2 mr-1">
        <p>
          Really enjoy the course on the T3 stack. Hoping to learn pusher, mux,
          and clerk integration into the stack
        </p>
      </div>
    </div>
  );
};
