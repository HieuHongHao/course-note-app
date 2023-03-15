import CourseView from "@/component/Course/CourseView";

const course = {
  name: "COMPSCI 230: Computer Systems Principles",
  description:
    "The course begins with a discussion of C data representation, and moves up the stack from there to the features of modern architectures, assembly languages, and operating system services such as I/O, process, and synchronization",
  instructor: "Marc Liberatore",
};

export default function TestCourseView() {
  return (
    <CourseView
      description={course.description}
      instructor={course.instructor}
      courseName={course.name}
    />
  );
}
