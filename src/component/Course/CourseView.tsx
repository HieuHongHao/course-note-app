/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {
  HeartIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface CourseViewProps {
  description: string;
  instructor: string;
  courseName: string;
}

export default function CourseView({
  description,
  instructor,
  courseName,
}: CourseViewProps) {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="ml-5 mr-auto mt-10 mb-0 flex h-max max-w-xl flex-col rounded-lg border-2  border-slate-200 ">
      <div className="ml-5 mt-3 text-lg font-bold text-slate-900">
        {courseName}
      </div>
      <div className="m-5 mt-1 flex flex-row">
        <img
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          src={session.data?.user.image!}
          className="object-fit h-10 w-10 rounded-full"
        />
        <div className="ml-2 flex flex-col space-y-0">
          <div className="font-semibold text-slate-900">{instructor}</div>
          <div className="text-slate-500">{session.data?.user.email}</div>
        </div>

        <div className="ml-auto flex flex-col">
          <div className="flex flex-row space-x-2">
            <div className="mt-2 h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="mt-0 text-base font-medium text-slate-600">
              Following
            </div>
          </div>
          <div className="mt-1 ml-5 text-sm text-slate-500">
            {
              new Date()
                .toISOString()
                .replace("-", "/")
                .split("T")[0]!
                .replace("-", "/")!
            }
          </div>
        </div>
      </div>
      <p className="ml-5 px-1 text-base font-normal text-slate-600">
        {description}
      </p>
      <div className="ml-4 flex flex-row">
        <div className="btn-ghost btn flex flex-row space-x-1">
          <HeartIcon className="m-1 mr-0 h-4 w-4" />
          <div className="countdown font-bold text-slate-900">12</div>
        </div>
        <a
          className="ml-auto mt-2 mr-5 flex h-max flex-row hover:border-b-2 hover:border-b-slate-700 hover:pb-0"
          href="Course/1"
        >
          View
          <ArrowTopRightOnSquareIcon className="ml-1 mt-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
