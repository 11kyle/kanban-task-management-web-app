import { ForwardedRef, forwardRef } from 'react'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-main-purple hover:bg-main-purple-hover text-white disabled:bg-main-purple-hover',
  secondary:
    'bg-main-purple bg-opacity-10 hover:bg-opacity-25 text-main-purple',
  destructive:
    'bg-main-red hover:bg-main-red-hover text-white'
  // filled:
  //   'rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400',
  // outline:
  //   'rounded-full py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
  // text: 'text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500',
}

const sizeStyles = {
  lg: 'h-[45px]',
  sm: 'h-[40px]',
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive'
  size?: 'lg' | 'sm'
  className?: string
  children?: React.ReactNode
}

// type Props = {
//   variant?: 'primary' | 'secondary' | 'destructive'
//   size?: 'lg' | 'sm'
//   className?: string
//   children?: React.ReactNode
//   props?: React.ButtonHTMLAttributes<HTMLButtonElement>
// }

export const Button = forwardRef(function Button({
  variant = 'primary', 
  size = 'sm', 
  className, 
  children,
  ...props
}: Props, ref?: ForwardedRef<HTMLButtonElement>) {
  className = clsx(
    'w-full rounded-full text-[13px] font-bold leading-[23px] px-6',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  return (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  )
})

// export function Button({
//   variant = 'primary',
//   size = 'sm',
//   className,
//   children,
//   ...props
// }: Props) {

//   className = clsx(
//     'w-full rounded-full text-[13px] font-bold leading-[23px]',
//     variantStyles[variant],
//     sizeStyles[size],
//     className
//   )

//   return (
//     <button className={className} {...props}>
//       {children}
//     </button>
//   )
// }
