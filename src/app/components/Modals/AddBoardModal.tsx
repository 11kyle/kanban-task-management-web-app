"use client"

import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Button } from '../Button'
import { useRouter } from "next/navigation"

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  // addBoard: (name: string) => Promise<void>
}

export default function AddBoardModal({ open, setOpen }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState("")
  const router = useRouter()

  // for initial focus
  const focusRef = useRef(null)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      // loading is true
      setIsLoading(true)
      // optomistic add to client
      // setBoards([...boards, { name: name, id: "" }])

      // add board to database
      const body = { name }
      const response = await fetch("/api/board", {
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

  return (
    <>
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
                  <form onSubmit={handleSubmit}>
                    <Dialog.Title as="h3" className="text-black heading-lg">
                      Add New Board
                    </Dialog.Title>
                    <div className="mt-6">
                        <div>
                          <label htmlFor="name" className="block text-medium-gray body-md">
                            Name
                          </label>
                          <div className="mt-2">
                            <input
                              required
                              ref={focusRef}
                              type="text"
                              name="name"
                              id="name"
                              className="block w-full rounded-md border-0 px-4 py-2 text-black ring-1 ring-inset ring-medium-gray placeholder:text-medium-gray focus:ring-2 focus:ring-inset focus:ring-main-purple"
                              placeholder="e.g. Web Design"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            {/* <Input /> */}
                          </div>
                        </div>
                    </div>
                    {/* <div className="mt-6">
                      <h4 className="text-medium-gray body-md">Columns</h4>
                      <div className="flex items-center gap-4">
                        <div className="grow rounded shrink-0 border border-medium-gray px-4 py-2">
                          <p className="text-black body-lg">Todo</p>
                        </div>
                        <button>
                          <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div> */}
                    <div className="mt-6 ">
                      <Button
                        type="submit"
                        variant="primary"
                        className="mt-3"
                        disabled={isLoading}
                        // onClick={() => setOpen(false)}
                      >
                        {isLoading ? "Creating Board..." : "Create New Board"}
                      </Button>
                      {/* <SubmitButton /> */}
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    {isLoading ? (
      <div className="fixed inset-0 z-50 bg-white bg-opacity-0" />
    ) : (
      null
    )}
    </>
  )
}
