/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from "react";
import { api } from "@/utils/api";
import CourseView from "./CourseView";

export default function CourseSearch() {
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
        Courses
      </div>
      <input
        type="search"
        className="mt-2 ml-10 h-10 w-1/3 rounded-lg border-slate-300 bg-slate-200 pl-5 placeholder-slate-500"
        placeholder="Search for courses"
        onChange={(e) => setSearch(e.target.value)}
        ref={inputRef}
      />
      <div className="m-5 mt-0 mb-0 flex flex-row flex-wrap">
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
