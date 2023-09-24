import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from '../Button'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  deleteBoard: (e: React.SyntheticEvent) => Promise<void>
}

export default function DeleteBoardModal({ open, setOpen, deleteBoard }: Props) {
  // const [open, setOpen] = useState(false)

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
                    <Dialog.Title as="h3" className="text-main-red heading-lg">
                      Delete this board?
                    </Dialog.Title>
                    <div className="mt-6">
                      <p className="text-medium-gray body-lg">
                      Are you sure you want to delete the &#39;Platform Launch&#39; board? This action will remove all columns and tasks and cannot be reversed.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-4">
                  <Button
                    type="button"
                    variant="destructive"
                    className=" sm:col-start-2"
                    onClick={deleteBoard}
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
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
