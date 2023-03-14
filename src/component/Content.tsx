/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CourseSearch from "./Course/CourseSearch";

function ContentItem({ item }: { item: string }) {
  switch (item) {
    case "Courses":
      return <CourseSearch />;
    default:
      return <CourseSearch />;
  }
}

export default function Content({ activeItem }: { activeItem: string }) {
  return (
    <div className="m-2 mt-0 flex min-h-screen w-full flex-col rounded-lg bg-slate-50 border-2 border-slate-200 pb-5">
      <ContentItem item={activeItem} />
    </div>
  );
}
