/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client"

import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { PlusCircleIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { Task } from './components/Task'
import { Column } from './components/Column'
import { Board } from './components/Board'
import Sidebar from './components/Sidebar'
import { Button } from './components/Button'
import DeleteTaskModal from './components/Modals/DeleteTaskModal'
import clsx from 'clsx'
import ViewTaskModal from './components/Modals/ViewTaskModal'

const userNavigation = [
  { name: 'Edit Board', href: '#' },
  { name: 'Delete Board', href: '#' },
]

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewTaskOpen, setViewTaskOpen] = useState(false)

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <Sidebar />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <Sidebar />
        </div>

        <div className="lg:pl-72">
          {/* <div className="fixed top-0 z-40 w-full"> */}
            <div className="fixed top-0 z-40 flex h-24 w-screen lg:w-[calc(100vw-288px)] shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

              <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6 lg:px-6">
                <h2 className="text-black heading-lg lg:heading-xl">Platform Launch</h2>
                <div className="flex items-center gap-x-2 lg:gap-x-4 ml-auto">
                  <PlusCircleIcon className="w-6 lg:w-8 text-main-purple hover:text-main-purple-hover" />
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open menu</span>
                      <PencilSquareIcon className="w-6 lg:w-7 text-medium-gray" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            <a
                              href={item.href}
                              className={clsx(
                                item.name === 'Delete Board' && 'text-main-red',
                                'block px-3 py-1 body-lg text-medium-gray'
                              )}
                            >
                              {item.name}
                            </a>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <main className="fixed top-24 bottom-0 inset-x-0 lg:left-72 lg:right-0 bg-light-gray">
            {/* Your content */}
            <Board>
              {[0,1,2].map((col, colIndex) => (
                <Column key={colIndex}>
                  {[0,1,2,3,4,5,6,7,8,9].map((task, taskIndex) => (
                    <Task key={taskIndex} handleClick={setViewTaskOpen}>
                      <p className="text-black heading-md">Build UI for onboarding flow</p>
                      <p className="text-medium-gray body-md">0 of 3 substasks</p>
                    </Task>
                  ))}
                </Column>
              ))}
            </Board>
          </main>
        </div>
      {/* </div> */}

      <DeleteTaskModal />
      <ViewTaskModal open={viewTaskOpen} setOpen={setViewTaskOpen} />
    </>
  )
}
