import {
  FolderIcon, EyeSlashIcon
} from '@heroicons/react/24/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid'
import Toggle from './Toggle'
import { LogoDark } from './Icons/LogoDark'

const navigation = [
  { name: 'Platform Launch', href: '#', icon: FolderIcon, current: true },
  { name: 'Marketing Plan', href: '#', icon: FolderIcon, current: false },
  { name: 'Roadmap', href: '#', icon: FolderIcon, current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 shrink-0 items-center">
        <LogoDark />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-6">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-main-purple text-white'
                        : 'text-medium-gray hover:text-main-purple hover:bg-light-gray',
                      'group flex items-center gap-x-3 rounded-md p-2 heading-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-white' : 'text-medium-gray group-hover:text-main-purple',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <div className="h-12 flex justify-center items-center gap-4 rounded-md bg-light-gray">
              <SunIcon className="w-5 text-medium-gray" aria-hidden="true" />
              <Toggle />
              <MoonIcon className="w-4 text-medium-gray" aria-hidden="true" />
            </div>
            {/* <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </a> */}
          </li>
          <li className="flex items-center gap-4 text-medium-gray heading-md mb-10">
            <EyeSlashIcon className="w-5" />
            Hide Sidebar
          </li>
        </ul>
      </nav>
    </div>
  )
}
