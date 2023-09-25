import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import DeleteTaskModal from './Modals/DeleteTaskModal'
import { Task } from '../utils/types'

type Props = {
  children: React.ReactNode
  setViewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>
  task: Task
}

export function Task({
  children,
  setViewTaskOpen,
  task,
}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState(false)

  // Delete Task
  const deleteTask = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    // close modal
    // setOpen(false)

    try {
      const body = task

      // optomistic delete from client
      // setBoards(boards.filter(board => board.id !== activeBoard?.id))

      // delete from database
      const response = await fetch("/api/task", {
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

    // close modal
    setOpen(false)
    // hide (delete) task
    setIsHidden(true)
  }

  return (
    <>
      {isHidden ?
        null
        : (
          <>
            <div 
              className="group relative w-[280px] shrink-0 rounded-lg bg-white dark:bg-dark-gray shadow-[0px_4px_6px_0px_rgba(54,78,126,0.10)]"
              // onClick={() => {
              //   setActiveTask(task)
              //   setViewTaskOpen(true)}
              // }
            >
              <div className="flex flex-col justify-center items-start gap-2 px-4 py-6">
                {children}
              </div>
              <div className="hidden group-hover:block absolute bottom-2 right-2">
                <button className="text-main-red" onClick={() => setOpen(true)}>
                  <TrashIcon className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <DeleteTaskModal 
              open={open}
              setOpen={setOpen}
              deleteTask={deleteTask}
            />
          </>
        )
      }
    </>
  )
}
