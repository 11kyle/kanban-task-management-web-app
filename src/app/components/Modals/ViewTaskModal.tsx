import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from '../Button'
import clsx from 'clsx'
import Select from '../Select'

const subtasks = [
  {
    id: 1,
    label: 'Research competitor pricing and business models',
    isChecked: true, 
  },
  {
    id: 2,
    label: 'Outline a business model that works for our solution',
    isChecked: true, 
  },
  {
    id: 3,
    label: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
    isChecked: false, 
  },
]

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ViewTaskModal({ open, setOpen }: Props) {
  // const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                  <div>
                    <Dialog.Title as="h3" className="text-black heading-lg">
                      Research pricing points of various competitors and trial different business models
                    </Dialog.Title>
                    <div className="mt-6">
                      <p className="text-medium-gray body-lg">
                        We know what we&#39;re planning to build for version one. Now we need to finalise the first pricing model we&#39;ll use. Keep iterating the subtasks until we have a coherent proposition.
                      </p>
                    </div>
                    <div className="mt-6">
                      <h4 className="text-medium-gray body-md">Subtasks &#40;2 of 3&#41;</h4>
                      <fieldset>
                        <legend className="sr-only">Subtasks</legend>
                        <div className="space-y-2 mt-4">
                          {subtasks.map(task => (
                            <div key={task.id} className="relative flex items-center bg-light-gray rounded-[4px] p-3">
                              <div className="flex items-center">
                                <input
                                  id="comments"
                                  aria-describedby="comments-description"
                                  name="comments"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  checked={task.isChecked}
                                />
                              </div>
                              <div className="ml-3">
                                <label 
                                  htmlFor="comments" 
                                  className={clsx(
                                    task.isChecked && "text-medium-gray line-through",
                                    "text-black body-md"
                                  )}
                                >
                                  {task.label}
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
                  <Select />
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
      </Dialog>
    </Transition.Root>
  )
}
