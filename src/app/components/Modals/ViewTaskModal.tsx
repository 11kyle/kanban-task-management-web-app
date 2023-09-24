import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { Button } from '../Button'
import clsx from 'clsx'
import { MenuIcon } from '../Icons/MenuIcon'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Column, Task } from '@/app/utils/types'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  task: Task
  columns: Column[]
}

export default function ViewTaskModal({ open, setOpen, task, columns }: Props) {
  const [selectedColumn, setSelectedColumn] = useState<Column>(columns[0])

  const focusRef = useRef(null)

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

        {task &&
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
                    <div>
                      <div className="flex">
                        <Dialog.Title as="h3" ref={focusRef} className="text-black heading-lg">
                          {task.title}
                        </Dialog.Title>
                        <button>
                          <MenuIcon className="w-7 text-medium-gray" />
                        </button>
                      </div>
                      <div className="mt-6">
                        <p className="text-medium-gray body-lg">
                          {task.description}
                        </p>
                      </div>
                      <div className="mt-6">
                        <h4 className="text-medium-gray body-md">
                          Subtasks &#40;{task.subtasks.filter(subtask => subtask.isCompleted).length} of {task.subtasks.length}&#41;
                        </h4>
                        <fieldset>
                          <legend className="sr-only">Subtasks</legend>
                          <div className="space-y-2 mt-4">
                            {task.subtasks.map(subtask => (
                              <div key={subtask.id} className="relative flex items-center bg-light-gray rounded-[4px] p-3">
                                <div className="flex items-center">
                                  <input
                                    id="comments"
                                    aria-describedby="comments-description"
                                    name="comments"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    checked={subtask.isCompleted}
                                    onChange={() => console.log('disabled: only used for viewing')}
                                  />
                                </div>
                                <div className="ml-3">
                                  <label 
                                    htmlFor="comments" 
                                    className={clsx(
                                      subtask.isCompleted && "text-medium-gray line-through",
                                      "text-black body-md"
                                    )}
                                  >
                                    {subtask.title}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    {/* <Select status={task.status} /> */}
                    <Listbox value={selectedColumn} onChange={setSelectedColumn}>
                        <Listbox.Button  className="block w-full rounded border-0 py-2 pl-4 pr-10 text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-main-purple">{selectedColumn.name}</Listbox.Button>
                        <Listbox.Options>
                          {columns.map((col) => (
                            <Listbox.Option
                              key={col.id}
                              value={col}
                            >
                              <span className="block truncate">{col.name}</span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Listbox>
                  </div>
                  {/* <div className="mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-4">
                    <Button
                      type="button"
                      variant="destructive"
                      className=" sm:col-start-2"
                      onClick={() => setOpen(false)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="mt-3 sm:col-start-1 sm:mt-0"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </Button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        }
      </Dialog>
    </Transition.Root>
  )
}
