import {
  AcademicCapIcon,
  ComputerDesktopIcon,
  BriefcaseIcon,
  MapIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import type { Dispatch, SetStateAction } from "react";

const SideBarItems = [
  "Courses",
  "Instructors",
  "Applications",
  "Map",
  "Profile",
];

function SideBarIcon({ item }: { item: string }) {
  switch (item) {
    case "Your Courses":
      return <ComputerDesktopIcon className="h-6 w-6" />;
    case "Instructors":
      return <AcademicCapIcon className="mr-6 ml-4 h-6 w-6" />;
    case "Applications":
      return <BriefcaseIcon className="mr-6 ml-4 h-6 w-6" />;
    case "Map":
      return <MapIcon className="mr-6 ml-4 h-6 w-6" />;
    case "Profile":
      return <UserCircleIcon className="mr-6 ml-4 h-6 w-6" />;
    default:
      return <ComputerDesktopIcon className="mr-6 ml-4 h-6 w-6" />;
  }
}

interface SideBarProps {
  activeItem: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
}

export default function SideBar({ activeItem, setActiveItem }: SideBarProps) {
  return (
    <div className="m-2 mt-0 flex min-h-screen w-max flex-col rounded-lg bg-slate-50 border-2 border-slate-200">
      {SideBarItems.map((item) => {
        return (
          <button
            key={item}
            className={`btn mt-5 ml-2 mr-4 mb-0 flex h-max w-11/12 flex-col items-center justify-center rounded-md border-none p-2  hover:bg-slate-300 ${
              item === activeItem ? "bg-slate-300" : "bg-inherit"
            }`}
            onClick={() => setActiveItem(item)}
          >
            <SideBarIcon item={item} />
            <span className="text-base font-normal normal-case text-slate-700 text-center">
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
}
