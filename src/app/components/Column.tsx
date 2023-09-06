type Props = {
  children: React.ReactNode
}

export function Column({ children }: Props) {
  return (
    <div className="w-[280px] h-full shrink-0 overflow-y-auto">
      {/* Heading */}
      <div className="sticky top-0 z-40 flex gap-3 shrink-0 bg-light-gray pb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="7.5" fill="#49C4E5"/>
        </svg>
        <p className="text-medium-gray heading-sm uppercase">Todo &#40;10&#41;</p>
      </div>
      {/* Tasks */}
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  )
}
