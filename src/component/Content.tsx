/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Courses from "./Course/Courses";



function ContentItem({ item }: { item: string }) {
  switch (item) {
    case "Courses":
      return <Courses />;
    default:
      return <Courses />;
  }
}



export default function Content({ activeItem }: { activeItem: string }) {
  return (
    <div className="m-2 mt-0 min-h-screen w-full rounded-lg bg-white border-2 border-slate-600 pb-5">
      <ContentItem item={activeItem} />
    </div>
  );
}
