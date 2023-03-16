/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from "react";
import { api } from "@/utils/api";
import CourseView from "./CourseView";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Tab, Transition } from "@headlessui/react";

function CourseSearch({ title }: { title: string }) {
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isSuccess } = api.course.getCourse.useQuery({
    courseName: search,
  });
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);
  return (
    <>
      <div className="mt-5 ml-10 text-2xl font-bold text-slate-900">
        {title}
      </div>
      <input
        type="search"
        className="mt-2 ml-10 h-10 w-1/3 rounded-lg border-slate-300 bg-slate-200 pl-5 placeholder-slate-500"
        placeholder="Search for courses"
        onChange={(e) => setSearch(e.target.value)}
        ref={inputRef}
      />
      {isSuccess && (
        <div className="m-5 mt-0 mb-0 flex flex-row flex-wrap">
          {data.map((course) => {
            return (
              <CourseView
                key={course.name}
                description={course.description}
                instructor={course.instructor}
                courseName={course.name}
              />
            );
          })}

          {title === "Your Courses" && <CreateCourseButton />}
        </div>
      )}
    </>
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

export default function Courses() {
  return (
    <div className="flex flex-col">
      <Tab.Group>
        <Tab.List className="mt-1 h-14 w-1/2 flex-row items-center justify-center rounded-t bg-white pr-0">
          <Tab className="box-border h-full w-1/4 rounded-l border-b text-lg font-semibold text-slate-700 hover:border-b hover:border-b-slate-500 focus:border-b focus:border-b-slate-500">
            Other Courses
          </Tab>
          <Tab className="box-border h-full w-1/4 rounded-r border-b text-lg font-semibold text-slate-700 hover:border-b hover:border-b-slate-500 focus:h-full focus:border-b focus:border-b-slate-500">
            Your Courses
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CourseSearch title="Courses" />
          </Tab.Panel>
          <Tab.Panel>
            <CourseSearch title="Your Courses" />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
