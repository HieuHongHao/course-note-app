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

interface CourseViewProps {
  description: string;
  instructor: string;
  courseName: string;
}

interface Status {
  state: "Completed" | "Following" | "Dropped";
}
const status = [
  { name: "Completed", color: "bg-green-500" },
  { name: "Following", color: "bg-yellow-500" },
  { name: "Dropped", color: "bg-pink-500" },
];

const StatusButton: React.FC<Status> = ({ state }) => {
  return (
    <Popover>
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button className="max-h relative flex max-w-md flex-row space-x-2 rounded-lg bg-yellow-200 px-1 hover:bg-yellow-300">
            <div className="mt-1.5 h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="font-semibold text-yellow-600">{state}</div>
            <ChevronUpIcon
              className={`${open ? "" : "rotate-180 transform text-opacity-70"}
                  ml-2 mt-0.5 h-5 w-5 text-yellow-700 transition duration-150 ease-in-out group-hover:text-opacity-80`}
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
            <Popover.Panel className="border-200 absolute flex w-28 -translate-y-24 translate-x-12 flex-col rounded-lg border bg-slate-100 px-1">
              {status.map((element) => {
                return (
                  <div className="flex flex-row space-x-2" key={element.name}>
                    <div
                      className={`mt-2 h-3 w-3 rounded-full ${element.color}`}
                    ></div>
                    <div className="mt-0 text-base font-medium text-slate-600">
                      {element.name}
                    </div>
                  </div>
                );
              })}
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
          <StatusButton state="Following" />
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
      <p className="ml-5 px-1 text-base font-normal text-slate-600 line-clamp-5">
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
          View
          <ArrowTopRightOnSquareIcon className="ml-1 mt-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default CourseView;