import {
  FolderIcon, EyeSlashIcon
} from '@heroicons/react/24/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid'
import Toggle from './Toggle'
import { LogoDark } from './Icons/LogoDark'
import clsx from 'clsx'
import { useState } from 'react'
import AddNewBoardModal from './Modals/AddBoardModal'

type Board = {
  id: string
  name: string
  columns: Column[]
}

type Column = {
  id: string 
  boardId: string 
  name: string
  tasks: Task[]
}

type Subtask = {
  id: string
  isCompleted: boolean
  taskId: string
  title: string
}

type Task = {
  id: string
  columnId: string
  description: string
  status: string
  title: string
  subtasks: Subtask[]
}

type Navigation = {
  board: Board
  current: boolean
}

type Props = {
  setActiveBoard: React.Dispatch<React.SetStateAction<Board>>
  navigation: Navigation[]
}

export default function Sidebar({ setActiveBoard, navigation }: Props) {
  const [newBoardOpen, setNewBoardOpen] = useState(false)

  return (
    <>
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 shrink-0 items-center">
          <LogoDark />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-6">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.board.id}>
                    <button
                      onClick={() => setActiveBoard(item.board)}
                      className={clsx(
                        item.current
                          ? 'bg-main-purple text-white'
                          : 'text-medium-gray hover:text-main-purple hover:bg-light-gray',
                        'group w-full flex items-center gap-x-3 rounded-md p-2 heading-md'
                      )}
                    >
                      <FolderIcon 
                        className={clsx(
                          item.current ? 'text-white' : 'text-medium-gray group-hover:text-main-purple',
                          'h-6 w-6 shrink-0'
                        )} 
                        aria-hidden="true" 
                      />
                      {item.board.name}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className='group w-full flex items-center gap-x-3 text-main-purple hover:text-main-purple-hover heading-md p-2'
                    onClick={()=> setNewBoardOpen(true)}
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
      
      <AddNewBoardModal 
        open={newBoardOpen}
        setOpen={setNewBoardOpen}
      />
    </>
  )
}
