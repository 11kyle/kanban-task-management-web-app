"use client"

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  EyeSlashIcon,
  FolderIcon,
  XMarkIcon,
  TrashIcon,
  PencilIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid'
import { Task } from '../components/Task'
import { Column } from '../components/Column'
import { Board } from '../components/Board'
import clsx from 'clsx'
import ViewTaskModal from '../components/Modals/ViewTaskModal'
import AddBoardModal from './Modals/AddBoardModal'
import DeleteBoardModal from './Modals/DeleteBoardModal'
import { Button } from './Button'
import { MenuIcon } from './Icons/MenuIcon'
import AddTaskModal from './Modals/AddTaskModal'
import AddColumnModal from './Modals/AddColumnModal'
import { LogoDark } from './Icons/LogoDark'
import Toggle from './Toggle'
import { Board as BoardType, Task as TaskType } from '../utils/types'
import EditBoardModal from './Modals/EditBoardModal'

type Props = {
  fetchedBoards: BoardType[]
  // children?: React.ReactNode
}

export default function Dashboard({ fetchedBoards }: Props) {
  const [boards, setBoards] = useState(fetchedBoards)
  const [activeBoard, setActiveBoard] = useState<BoardType | null>(fetchedBoards[0])
  const [activeTask, setActiveTask] = useState<TaskType | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewTaskOpen, setViewTaskOpen] = useState(false)
  const [addBoardModalOpen, setAddBoardModalOpen] = useState(false)
  const [editBoardModalOpen, setEditBoardModalOpen] = useState(false)
  const [delteBoardModalOpen, setDeleteBoardModalOpen] = useState(false)
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false)
  const [addColumnModalOpen, setAddColumnModalOpen] = useState(false)

  // update dashboard after revalidate
  useEffect(() => {
    setBoards(fetchedBoards)
  },[fetchedBoards])

  // Delete Board
  const deleteBoard = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    // close modal
    setDeleteBoardModalOpen(false)

    try {
      const body = activeBoard

      // optomistic delete from client
      setBoards(boards.filter(board => board.id !== activeBoard?.id))

      // activeBoard has been deleted so a new board needs to be activated
      setActiveBoard(boards[0])

      // delete from database
      const response = await fetch("/api/board", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })

      const result = await response.json()
      console.log("Success:", result)
    } catch (error) {
      console.error("Error:", error)
    }

    // activeBoard has been deleted so a new board needs to be activated
    setActiveBoard(boards[0])
  }

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
                  {/* <Sidebar 
                    setActiveBoard={setActiveBoard}
                    navigation={boards.map(board => { 
                      return { 
                        board: board,
                        current: activeBoard?.id === board.id ? true : false  
                      } 
                    })} 
                  /> */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                    <div className="flex h-16 shrink-0 items-center">
                      <LogoDark />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-6">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {boards.map((board) => (
                              <li key={board.id}>
                                <button
                                  onClick={() => setActiveBoard(board)}
                                  className={clsx(
                                    board.id === activeBoard?.id
                                      ? 'bg-main-purple text-white'
                                      : 'text-medium-gray hover:text-main-purple hover:bg-light-gray',
                                    'group w-full flex items-center gap-x-3 rounded-md p-2 heading-md'
                                  )}
                                >
                                  <FolderIcon 
                                    className={clsx(
                                      board.id === activeBoard?.id 
                                        ? 'text-white' : 'text-medium-gray group-hover:text-main-purple',
                                        'h-6 w-6 shrink-0'
                                      )} 
                                    aria-hidden="true" 
                                  />
                                  {board.name}
                                  {board.id === activeBoard?.id
                                    ? <PlusIcon className="w-5 h-5 text-white ml-auto" aria-hidden="true" /> 
                                    : null
                                  }
                                </button>
                              </li>
                            ))}
                            <li>
                              <button
                                className='group w-full flex items-center gap-x-3 text-main-purple hover:text-main-purple-hover heading-md p-2'
                                onClick={()=> setAddBoardModalOpen(true)}
                              >
                                <FolderIcon 
                                  className={clsx(
                                    'text-main-purple group-hover:text-main-purple-hover',
                                    'h-6 w-6 shrink-0'
                                  )} 
                                  aria-hidden="true" 
                                />
                                Create New Board
                              </button>
                            </li>
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <div className="h-12 flex justify-center items-center gap-4 rounded-md bg-light-gray">
                            <SunIcon className="w-5 text-medium-gray" aria-hidden="true" />
                            <Toggle />
                            <MoonIcon className="w-4 text-medium-gray" aria-hidden="true" />
                          </div>
                        </li>
                        <li className="flex items-center gap-4 text-medium-gray heading-md mb-10">
                          <EyeSlashIcon className="w-5" />
                          Hide Sidebar
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* <Sidebar 
            setActiveBoard={setActiveBoard}
            navigation={boards.map(board => { 
              return { 
                board: board,
                current: activeBoard?.id === board.id ? true : false 
              } 
            })} 
          /> */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <LogoDark />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-6">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {boards.map((board) => (
                      <li key={board.id}>
                        <button
                          onClick={() => setActiveBoard(board)}
                          className={clsx(
                            board.id === activeBoard?.id
                              ? 'bg-main-purple text-white'
                              : 'text-medium-gray hover:text-main-purple hover:bg-light-gray',
                            'group w-full flex items-center gap-x-3 rounded-md p-2 heading-md'
                          )}
                        >
                          <FolderIcon 
                            className={clsx(
                              board.id === activeBoard?.id ? 
                                'text-white' : 'text-medium-gray group-hover:text-main-purple',
                                'h-6 w-6 shrink-0'
                            )} 
                            aria-hidden="true" 
                          />
                          {board.name}
                          {board.id === activeBoard?.id
                            ? <PlusIcon className="w-5 h-5 text-white ml-auto" aria-hidden="true" /> 
                            : null
                          }
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        className='group w-full flex items-center gap-x-3 text-main-purple hover:text-main-purple-hover heading-md p-2'
                        onClick={()=> setAddBoardModalOpen(true)}
                      >
                        <FolderIcon 
                          className={clsx(
                            'text-main-purple group-hover:text-main-purple-hover',
                            'h-6 w-6 shrink-0'
                          )} 
                          aria-hidden="true" 
                        />
                        Create New Board
                      </button>
                    </li>
                  </ul>
                </li>
                <li className="mt-auto">
                  <div className="h-12 flex justify-center items-center gap-4 rounded-md bg-light-gray">
                    <SunIcon className="w-5 text-medium-gray" aria-hidden="true" />
                    <Toggle />
                    <MoonIcon className="w-4 text-medium-gray" aria-hidden="true" />
                  </div>
                </li>
                <li className="flex items-center gap-4 text-medium-gray heading-md mb-10">
                  <EyeSlashIcon className="w-5" />
                  Hide Sidebar
                </li>
              </ul>
            </nav>
          </div>
          
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
                <h2 className="text-black heading-lg lg:heading-xl">{activeBoard?.name}</h2>
                <div className="flex items-center gap-x-2 lg:gap-x-4 ml-auto">
                  <Button variant="primary" onClick={() => setOpenNewTaskModal(true)}>
                    Add Task
                  </Button>
                  {/* Dropdown */}
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-black hover:bg-opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="20" viewBox="0 0 5 20" fill="none">
                          <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3"/>
                          <circle cx="2.30769" cy="10" r="2.30769" fill="#828FA3"/>
                          <circle cx="2.30769" cy="17.6923" r="2.30769" fill="#828FA3"/>
                        </svg>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? 'bg-main-purple text-white' : 'text-medium-gray'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={() => setEditBoardModalOpen(true)}
                              >
                                <PencilIcon 
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                                Edit Board
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? 'bg-main-purple text-white' : 'text-medium-gray'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={() => setDeleteBoardModalOpen(true)}
                              >
                                <TrashIcon 
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                                Delete Board
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <main className="fixed top-24 bottom-0 inset-x-0 lg:left-72 lg:right-0 bg-light-gray">
            <Board>
              {activeBoard 
                ? activeBoard.columns.length < 1 
                  ? <div className="mx-auto grid place-content-center gap-8">
                      <p className="text-medium-gray heading-lg text-center">This board is empty. Create a new column to get started.</p>
                      <div className="w-44 mx-auto">
                        <Button variant="primary" onClick={() => setAddColumnModalOpen(true)}>Add New Column</Button>                        
                      </div>
                    </div> 
                  : boards.filter(board => board.id === activeBoard.id)[0].columns.map(col => (
                    <Column key={col.id} name={col.name}>
                      {col.tasks.map((task) => {
                        let completedCount = task.subtasks.filter(subtask => subtask.isCompleted).length
                        
                        return (
                          <Task key={task.id} setViewTaskOpen={setViewTaskOpen} task={task}>
                            <p className="text-black heading-md">{task.title}</p>
                            <p className="text-medium-gray body-md">{completedCount} of {task.subtasks.length} substasks</p>
                          </Task>
                        )
                      })}
                    </Column>
                ))
                : null
              }
              
            </Board>
          </main>
        </div>
      {/* </div> */}
      <AddBoardModal 
        open={addBoardModalOpen}
        setOpen={setAddBoardModalOpen}
      />
      <DeleteBoardModal 
        open={delteBoardModalOpen}
        setOpen={setDeleteBoardModalOpen}
        deleteBoard={deleteBoard}
      />
      {activeBoard 
      ? <EditBoardModal 
          open={editBoardModalOpen}
          setOpen={setEditBoardModalOpen}
          board={activeBoard}
        />
      : null
      }
      
      {/* {activeTask 
        ? <ViewTaskModal 
            open={viewTaskOpen} 
            setOpen={setViewTaskOpen}
            task={activeTask} 
            columns={activeBoard.columns}
          /> 
        : null
      } */}
      {/* {activeBoard
        ? <AddColumnModal 
            open={addColumnModalOpen}
            setOpen={setAddColumnModalOpen}
            activeBoardId={activeBoard.id}
          />
        : null
      } */}
      {activeBoard && activeBoard.columns.length > 0
        ? <AddTaskModal 
            open={openNewTaskModal}
            setOpen={setOpenNewTaskModal}
            columns={activeBoard.columns}
          />
        : null
      }
    </>
  )
}
