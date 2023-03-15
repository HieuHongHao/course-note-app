import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export default function Hover() {
  return (
    <Popover className="flex flex-col ">
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button className="relative">Solutions</Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute translate-y-3 flex w-96 flex-col rounded-lg bg-slate-200 -translate-x-20">
              <div>Test</div>
              <div>Test 1</div>
              <div>Test 2</div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
