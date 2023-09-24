"use client"

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { Button } from '../Button'
import clsx from 'clsx'
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { Column } from '@/app/utils/types'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  columns: Column[]
}

type TaskForm = {
  title: string
  description: string
  status: string
  columnId: string
}

export default function AddTaskModal({ open, setOpen, columns }: Props) {
  // const [newSubtask, setNewSubtask] = useState<string>('')
  // const [subtasks, setSubtasks] = useState<string[]>([])
  const [selectedColumn, setSelectedColumn] = useState<Column>(columns[0])
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<TaskForm>({
    title: "",
    description: "",
    status: "",
    columnId: "",
  })
  const focusRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    setForm({...form, status: selectedColumn.name, columnId: selectedColumn.id})
  }, [selectedColumn])

  // handle submit
  const handleSubmit = async (e: React.SyntheticEvent) => {
    // e.preventDefault() // do not need this unless submitting a form

    // 
    try {
      // loading is true
      setIsLoading(true)
      // optomistic add to client
      // setBoards([...boards, { name: name, id: "" }])

      // add board to database
      const body = form
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      })

      const result = await response.json()
      console.log("Success:", result)
    } catch (error) {
      console.error("Error:", error)
    }

    //loading to false
    setIsLoading(false)
    // close modal
    setOpen(false)
    
    router.refresh()
  }

  // add subtask
  // const addSubtask = (e: React.SyntheticEvent) => {
  //   e.preventDefault()
  //   // add subtask
  //   setSubtasks([...subtasks, newSubtask])
  //   setForm({...form, subtasks: [...form.subtasks, newSubtask]})
  //   // clear input
  //   setNewSubtask('')
  // }

  // // remove subtask
  // const removeSubtask = (e: React.SyntheticEvent, deleteSubtask: string) => {
  //   e.preventDefault()
  //   // remove subtask
  //   setSubtasks(subtasks.filter(subtask => subtask !== deleteSubtask))
  //   setForm({...form, subtasks: form.subtasks.filter(subtask => subtask !== deleteSubtask)})
  // }

  // set default selectedColumn
  useEffect(() => {
    setSelectedColumn(columns[0])
  },[columns])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={focusRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <form>
                    <Dialog.Title as="h3" className="text-black heading-lg">
                      Add New Task
                    </Dialog.Title>
                    {/* Title */}
                    <div className="mt-6">
                      <label htmlFor="title" className="block text-medium-gray body-md">
                        Title
                      </label>
                      <div className="mt-2">
                        <input
                          required
                          ref={focusRef}
                          type="text"
                          name="title"
                          id="title"
                          className="block w-full rounded border-0 px-4 py-2 text-black body-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-main-purple"
                          placeholder="e.g. Take coffee break"
                          value={form?.title}
                          onChange={(e) => setForm({...form, title: e.target.value})}
                        />
                      </div>
                    </div>
                    {/* Description */}
                    <div className="mt-6">
                      <label htmlFor="description" className="block text-medium-gray body-md">
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea 
                          rows={4}
                          name="description"
                          id="description"
                          className="block w-full rounded border-0 px-4 py-2 resize-none text-black body-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-main-purple"
                          placeholder="e.g. It&#39;s always good to take a break. This 15 minute break will recharge the batteries a little."
                          value={form.description}
                          onChange={(e) => setForm({...form, description: e.target.value})}
                        />
                      </div>
                    </div>
                    {/* Subtasks */}
                    {/* <div className="mt-6">
                      <label htmlFor="subtask-title" className="block text-medium-gray body-md">
                        Subtasks
                      </label>
                      {subtasks?.map(subtask => {
                        return (
                          <div key={subtask} className="mt-2 flex gap-4">
                            <p className="w-full rounded border-0 px-4 py-2 text-black body-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-main-purple">
                              {subtask}
                            </p>
                            <button onClick={(e) => removeSubtask(e, subtask)}>
                            <XMarkIcon className="w-5" aria-hidden="true" />
                            </button>
                          </div>
                        )
                      })}
                      <div className="mt-2">
                        <input
                          type="text"
                          name="subtask-title"
                          id="subtask-title"
                          className="block w-full rounded border-0 px-4 py-2 text-black body-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-main-purple"
                          placeholder="e.g. Take coffee break"
                          value={newSubtask}
                          onChange={(e) => setNewSubtask(e.target.value)}
                        />
                      </div>
                      <div className="mt-2">
                        <Button 
                          variant="secondary" 
                          onClick={(e) => addSubtask(e)}
                          disabled={newSubtask.length < 1}
                        >
                          Add New Subtask
                        </Button>
                      </div>
                    </div> */}
                    {/* Status */}
                    <div className="mt-6">
                      <p className="block text-medium-gray body-md">
                        Status
                      </p>
                      <div className="mt-2">
                        <Listbox value={selectedColumn} onChange={setSelectedColumn}>
                        <Listbox.Button className="relative w-full rounded border-0 px-4 py-2 text-black body-lg text-left ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-main-purple focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-main-purple-hover">
                          <span className="block truncate">{selectedColumn.name}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                          {/* <Listbox.Button  className="block w-full rounded border-0 py-2 pl-4 pr-10 text-black text-left ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-main-purple">{selectedColumn.name}</Listbox.Button> */}
                          <Listbox.Options className="mt-1 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {columns.map((col) => (
                              <Listbox.Option
                                key={col.id}
                                value={col}
                              >
                                {({ active }) => (
                                  <span 
                                    className={clsx(
                                      active ? "bg-main-purple text-white" : "text-medium-gray",
                                      "block truncate pl-4")}
                                  >
                                    {col.name}
                                  </span>
                                )}
                                
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Listbox>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="button" onClick={() => handleSubmit}>
                        Create Task
                      </Button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
