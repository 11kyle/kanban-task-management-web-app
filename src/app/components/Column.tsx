import { TrashIcon } from "@heroicons/react/24/outline"

type Props = {
  children?: React.ReactNode
  name?: string
}

export function Column({ children, name }: Props) {
  return (
    <div className="w-[280px] h-full shrink-0 overflow-y-auto">
      {/* Heading */}
      <div className="group sticky top-0 z-40 bg-light-gray flex">
        <div className=" flex gap-3 shrink-0  pb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="7.5" cy="7.5" r="7.5" fill="#49C4E5"/>
          </svg>
          <p className="text-medium-gray heading-sm uppercase">{name} &#40;10&#41;</p>
        </div>
        <div className="ml-auto hidden group-hover:block">
          <TrashIcon className="w-4 h-4 text-main-red hover:text-main-red-hover" aria-hidden="true" />
        </div>
      </div>
      {/* Tasks */}
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  )
}
