type Props = {
  children: React.ReactNode
}

export function Board({ children }: Props) {
  return (
    <div className="w-full h-full flex gap-6 overflow-x-auto p-6">
      {children}
    </div>
  )
}
