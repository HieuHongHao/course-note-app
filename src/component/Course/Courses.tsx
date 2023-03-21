/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormEvent, useEffect, useRef, useState } from "react";
import { api } from "@/utils/api";
import CourseView from "./CourseView";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Tab, Transition, Popover } from "@headlessui/react";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function CourseSearch() {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const parent = useRef<HTMLDivElement>(null);
  const { data, isSuccess } = api.course.getCourse.useQuery({
    courseName: search,
  });

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);
  useEffect(() => {
    parent.current &&
      autoAnimate(parent.current, {
        duration: 300,
        easing: "ease-out",
      });
  }, [parent]);

  return (
    <>
      <div className="mt-0 ml-10 text-2xl font-bold text-slate-900">
        Featuring Courses
      </div>
      <input
        type="search"
        className="mt-2 ml-10 h-10 w-1/3 rounded-lg bg-white pl-5 placeholder-slate-500"
        placeholder="Search for courses"
        onChange={(e) => setSearch(e.target.value)}
        ref={inputRef}
      />
      <div className="m-5 mt-0 mb-0 flex flex-row flex-wrap" ref={parent}>
        {isSuccess &&
          data.map((course) => {
            return (
              <CourseView
                key={course.name}
                description={course.description}
                instructor={course.instructor}
                courseName={course.name}
              />
            );
          })}
      </div>
    </>
  );
}

function YourCourse() {
  const { data, isSuccess } = api.course.getUserCourse.useQuery();
  const { mutate } = api.course.createCourse.useMutation();
  const [parent, enableAnimations] = useAutoAnimate<HTMLDivElement>({ duration: 300, easing: "ease-out" });
  const context = api.useContext();

  function handleSubmitCourse(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { courseName, courseDescription } = Object.fromEntries(
      formData.entries()
    ) as { courseName: string; courseDescription: string };
    mutate(
      { courseName, courseDescription },
      {
        onSuccess: (data) => {
          void context.course.getUserCourse.invalidate();
        },
      }
    );
  }

  return (
    <>
      <div className="mt-0 ml-10 text-2xl font-bold text-slate-900">
        Your Courses
      </div>
      <input
        type="search"
        className="mt-2 ml-10 h-10 w-1/3 rounded-lg border-slate-300 bg-slate-200 pl-5 placeholder-slate-500"
        placeholder="Search for courses"
      />
      <CreateCourseButton handler={handleSubmitCourse} />
      <div className="m-5 mt-0 mb-0 flex flex-row flex-wrap" ref={parent}>
        {isSuccess &&
          data.map((course) => {
            return (
              <CourseView
                key={course.title}
                description={course.description}
                instructor={course.intructor.name!.split(" ").slice(0,2).join(" ")}
                courseName={course.title}
              />
            );
          })}
      </div>
    </>
  );
}

function CreateCourseButton({
  handler,
}: {
  handler: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Popover>
      <Popover.Button className="relative mb-0 ml-5 mr-auto mt-10 flex h-64 w-5/12 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white">
        <div className="btn font-semibold">
          <PlusIcon className="mr-1 h-4 w-4 object-cover" />
          New Course
        </div>
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute w-96 translate-x-96 -translate-y-96 rounded-lg bg-white shadow-md">
          <form onSubmit={(e) => handler(e)} className="flex flex-col">
            <label
              htmlFor=""
              className="ml-5 mr-5 mb-1 mt-2 text-sm font-semibold text-slate-700"
            >
              Course name
            </label>
            <input
              type="text"
              className="mr-5 ml-5 mb-0 mt-0 w-2/3 rounded-md border border-slate-400 bg-white "
              name="courseName"
            />

            <label
              htmlFor=""
              className="ml-5 mr-5 mb-1 mt-0 text-sm font-semibold text-slate-700"
            >
              Course Description
            </label>

            <textarea
              name="courseDescription"
              id=""
              className="ml-5 mr-5 mb-2 mt-0 h-48 rounded-md border border-slate-400"
            ></textarea>
            <button
              className="btn ml-auto mr-auto mb-2 w-max rounded-md bg-blue-200 text-lg font-semibold normal-case text-sky-600 hover:bg-blue-300
          "
            >
              Submit
            </button>
          </form>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default function Courses() {
  return (
    <div className="flex flex-col">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="mt-6 mb-0 ml-5 h-14 w-1/2 flex-row items-center justify-center space-x-2 pr-0">
          <Tab className="border-box w-1/4 text-lg font-semibold text-slate-700 hover:border-b hover:border-b-slate-500 focus:box-content focus:border-b focus:border-b-slate-500">
            Other Courses
          </Tab>
          <Tab className="border-box w-1/4 text-lg font-semibold text-slate-700 hover:border-b hover:border-b-slate-500 focus:box-content focus:border-b focus:border-b-slate-500">
            Your Courses
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CourseSearch />
          </Tab.Panel>
          <Tab.Panel>
            <YourCourse />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
