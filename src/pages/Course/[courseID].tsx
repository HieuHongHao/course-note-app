import { useRouter } from "next/router";



export default function CoursePage() {
  const router = useRouter();
  const { courseID } = router.query;
  
  return (
    <div className="grid h-screen grid-cols-3 grid-rows-3">
      <div className="col-span-2 row-span-2 border-r-2 border-slate-200 bg-slate-50 text-slate-900">
        {courseID}
      </div>
      <div className="rows-span-2 col-span-1 h-screen border-r-2 border-slate-200 bg-slate-50 text-slate-900">
        {(courseID as string) + "1"}
      </div>
      <div className="col-span-3 row-span-1 border-t-2 border-slate-200 bg-slate-50 text-slate-900">
        {courseID}
      </div>
    </div>
  );
}
