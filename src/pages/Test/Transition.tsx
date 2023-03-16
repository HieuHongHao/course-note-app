import { Transition } from "@headlessui/react";
import { useState } from "react";

function Sidebar() {
  const [isShowing, setIsShowing] = useState(false);
  return (
    /* The `show` prop controls all nested `Transition.Child` components. */
    <div className="flex flex-col justify-center items-center">
      <button
        className="bg-sky-300 text-base font-semibold text-sky-700 rounded-md px-2 shadow hover:shadow-inner"
        onClick={() => setIsShowing(!isShowing)}
      >
        Show
      </button>
      <Transition show={isShowing}>
        {/* Background overlay */}
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>Test_1</div>
        </Transition.Child>

        {/* Sliding sidebar */}
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div>Test_2</div>
        </Transition.Child>
      </Transition>
    </div>
  );
}


export default Sidebar;
