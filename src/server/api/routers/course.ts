import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

interface Course {
  name: string;
  description: string;
  instructor: string;
}

const courses: Course[] = [
  {
    name: "COMPSCI 320: Introduction to Software Engineer",
    description:
      "Software engineering goes beyond software development. It involves defining software products, dealing with customers who may not understand software or even their own needs, coordinating large teams of coworkers, ensuring the quality of software, shipping and maintaining software, and much more! As well as requiring strong technical skills, a good software engineer requires strong teamwork and communication skills. Get ready to learn software engineering principles first hand, ship product, and survive to do it again!",
    instructor: "Gordon Anderson",
  },
  {
    name: "COMPSCI 187: Programming with Data Structures",
    description:
      "The main focus is on how to build and encapsulate data objects and their associated operations. Specific topics include linked structures, recursive structures and algorithms, binary trees, balanced trees, and hash tables. These topics are fundamental to programming and are essential to other courses in computer science",
    instructor: "Gordon Anderson",
  },
  {
    name: "COMPSCI 230: Computer Systems Principles",
    description:
      "The course begins with a discussion of C data representation, and moves up the stack from there to the features of modern architectures, assembly languages, and operating system services such as I/O, process, and synchronization",
    instructor: "Marc Liberatore",
  },
  {
    name: "COMPSCI 311: Introduction to Algorithms",
    description:
      "This course will introduce you to a variety of techniques to design algorithms, such as divide and conquer, greedy, dynamic programming, and network flow. You will learn to study the performance of various algorithms within a formal, mathematical framework",
    instructor: "Marius Minea",
  },
  {
    name: "COMPSCI 345: Practical and Application of Data Managemnt",
    description:
      "The purpose of this course is to provide a comprehensive introduction to the use of data management systems within the context of various applications. Some of the covered topics include application-driven database design, schema refinement, implementation of basic transactions, data on the web, and data visualization. ",
    instructor: "Alexandra Meliou",
  },
];

export const courseRouter = createTRPCRouter({
  getCourse: publicProcedure
    .input(
      z.object({
        courseName: z.string(),
      })
    )
    .query(({ input }) => {
      const res = courses.filter((course) =>
        course.name.startsWith(input.courseName)
      );
      return res;
    }),
});
