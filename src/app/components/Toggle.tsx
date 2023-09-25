import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { useTheme } from 'next-themes'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Toggle() {
  const [enabled, setEnabled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    console.log('theme changed')
    setTheme(theme === 'dark' ? 'light' : 'dark')  
  }, [enabled])

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? 'bg-main-purple-hover' : 'bg-main-purple',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-main-purple focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch>
  )
}
