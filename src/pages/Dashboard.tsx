import { useState } from "react";
import Content from "@/component/Content";
import NavBar from "@/component/NavBar";
import SideBar from "@/component/SideBar";


export default function DashBoard() {
  const [activeItem, setActiveItem] = useState("Courses");
  return (
    <div className="flex flex-col space-y-1">
      <NavBar />
      <div className="flex flex-row">
        <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />
        <Content activeItem={activeItem} />
      </div>
      
    </div>
  );
}

