/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {
  HeartIcon,
  ArrowTopRightOnSquareIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import moment from "moment";

interface CourseViewProps {
  description: string;
  instructor: string;
  courseName: string;
}

type State = "Completed" | "Following" | "Dropped" | "Unfollowed";

interface Status {
  state: State;
}

const statuses: State[] = ["Completed", "Following", "Dropped", "Unfollowed"];

// todo: map statusColor to static classname
const statusColor = {
  Completed: {
    bg: {
      "200": "bg-teal-200",
      "300": "bg-teal-300",
      "500": "bg-teal-500",
      "700": "bg-teal-700",
      hover: {
        "200": "hover:bg-teal-200",
        "300": "hover:bg-teal-300",
        "500": "hover:bg-teal-500",
        "700": "hover:bg-teal-700",
      },
    },
    text: {
      "600": "text-teal-700",
      "700": "text-teal-700",
    },
  },
  Following: {
    bg: {
      "200": "bg-yellow-200",
      "300": "bg-yellow-300",
      "500": "bg-yellow-500",
      "700": "bg-yellow-700",
      hover: {
        "200": "hover:bg-yellow-200",
        "300": "hover:bg-yellow-300",
        "500": "hover:bg-yellow-500",
        "700": "hover:bg-yellow-700",
      },
    },
    text: {
      "600": "text-yellow-700",
      "700": "text-yellow-700",
    },
  },
  Dropped: {
    bg: {
      "200": "bg-pink-200",
      "300": "bg-pink-300",
      "500": "bg-pink-500",
      "700": "bg-pink-700",
      hover: {
        "200": "hover:bg-pink-200",
        "300": "hover:bg-pink-300",
        "500": "hover:bg-pink-500",
        "700": "hover:bg-pink-700",
      },
    },
    text: {
      "600": "text-pink-600",
      "700": "text-pink-700",
    },
  },
  Unfollowed: {
    bg: {
      "200": "bg-sky-200",
      "300": "bg-sky-300",
      "500": "bg-sky-500",
      "700": "bg-sky-700",
      hover: {
        "200": "hover:bg-sky-200",
        "300": "hover:bg-sky-300",
        "500": "hover:bg-sky-500",
        "700": "hover:bg-sky-700",
      },
    },
    text: {
      "600": "text-sky-600",
      "700": "text-sky-700",
    },
  },
};

const StatusButton: React.FC<Status> = ({ state }) => {
  const [currentStatus, setCurrentStatus] = useState(state);

  return (
    <Popover>
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button
            className={`max-h relative flex max-w-md flex-row space-x-1 rounded-lg ${statusColor[currentStatus].bg[200]}  px-1 ${statusColor[currentStatus].bg.hover[300]}`}
          >
            <div
              className={`mt-1.5 h-3 w-3 rounded-full ${statusColor[currentStatus].bg[500]}`}
            ></div>
            <div
              className={`font-semibold ${statusColor[currentStatus].text["600"]}`}
            >
              {currentStatus}
            </div>
            <ChevronUpIcon
              className={`${open ? "" : "rotate-180 transform text-opacity-70"}
                  ml-0 mt-0.5 h-5 w-5 ${
                    statusColor[currentStatus].text[700]
                  } transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="border-200 absolute flex w-max -translate-y-32 translate-x-12 flex-col rounded-lg border bg-slate-100 px-1">
              {({ close }) => (
                <>
                  {statuses.map((status) => {
                    return (
                      <button
                        className={`flex flex-row space-x-2 ${statusColor[status].bg.hover[300]} rounded-md px-1`}
                        key={status}
                        onClick={() => {
                          setCurrentStatus(status);
                          close();
                        }}
                      >
                        <div
                          className={`mt-2 h-3 w-3 rounded-full ${statusColor[status].bg[500]}`}
                        ></div>
                        <div className="mt-0 text-base font-medium text-slate-600">
                          {status}
                        </div>
                      </button>
                    );
                  })}
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const CourseView: React.FC<CourseViewProps> = ({
  description,
  instructor,
  courseName,
}) => {
  const session = useSession();
  return (
    <div className="ml-5 mr-auto mt-10 mb-0 flex h-max max-w-xl flex-col rounded-xl border-2 border-slate-400 bg-white">
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
          <div className="flex flex-row space-x-3">
            <div className="font-semibold text-slate-900">{instructor}</div>
            <div className="mt-0.5 text-sm text-slate-500">
              {moment().format("MMMM Do YYYY")}
            </div>
          </div>
          <div className="text-slate-500">
            {instructor.replace(" ", "").toLowerCase() + "@gmail.com"}
          </div>
        </div>
        
        <div className="ml-auto">
          <StatusButton state="Unfollowed" />
        </div>
      </div>
      <p className="ml-5 px-1 text-base font-normal text-slate-800 line-clamp-5">
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
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>View</div>
          <ArrowTopRightOnSquareIcon className="ml-1 mt-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default CourseView;
