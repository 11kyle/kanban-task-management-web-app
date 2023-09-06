type Props = {
  children: React.ReactNode
  handleClick: React.Dispatch<React.SetStateAction<boolean>>
}

export function Task({ children, handleClick }: Props) {
  return (
    <div 
      className="w-[280px] shrink-0 rounded-lg bg-white shadow-[0px_4px_6px_0px_rgba(54,78,126,0.10)] cursor-pointer"
      onClick={() => handleClick(true)}
    >
      <div className="flex flex-col justify-center items-start gap-2 px-4 py-6">
        {children}
      </div>
    </div>
  )
}
