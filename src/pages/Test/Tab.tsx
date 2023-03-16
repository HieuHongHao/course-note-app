import { Tab, Transition } from "@headlessui/react";
import CourseView from "@/component/Course/CourseView";
import CourseSearch from "@/component/Course/Courses";
import { PlusIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}



export default function Example() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Tab.Group>
        <Tab.List className="mt-96 flex h-8 w-1/6 flex-row items-center justify-center rounded-lg border-2 border-slate-200 bg-white">
          <Tab className="h-full w-1/2 rounded-md rounded-r-none border-r-2 font-semibold text-slate-700 hover:bg-slate-300">
            Tab 1
          </Tab>
          <Tab className="h-full w-1/2 rounded-md  rounded-l-none font-semibold text-slate-700 hover:bg-slate-300 ">
            Tab 2
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CourseSearch />
          </Tab.Panel>
          <Tab.Panel className="m-2 mt-0 min-h-screen w-screen rounded-lg pb-5 flex justify-center items-center">
            <div className="flex flex-col w-5/6">
              <div className="mt-5 ml-10 text-2xl font-bold text-slate-900">
                Courses
              </div>
              <input
                type="search"
                className="mt-2 ml-10 h-10 w-1/3 rounded-lg border-slate-300 bg-slate-200 pl-5 placeholder-slate-500"
                placeholder="Search for courses"
              />
              <CreateCourseButton />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
function CreateCourseButton() {
  return (
    <div className="mb-0 ml-5 mr-auto mt-10 flex h-64 w-5/12 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300">
      <div className="btn bg-sky-200 font-semibold text-sky-600 hover:bg-sky-300">
        <PlusIcon className="mr-1 h-4 w-4 object-cover" />
        New Course
      </div>
    </div>
  );
}


