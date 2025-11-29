import React from 'react'

interface HamburgerProps {
  handleClick: () => void
  active: boolean
}

const Hamburger: React.FC<HamburgerProps> = ({ handleClick, active }) => {
  return (
    <button
      className="hover:bg-secondary flex flex-col rounded-sm p-3 text-zinc-700 outline-hidden lg:hidden dark:text-white dark:hover:text-white"
      onClick={handleClick}
      aria-label="Mobile Menu"
    >
      <div
        className={`ease my-[.1875rem] h-1 w-6 transform rounded-full bg-indigo-500 transition duration-300 dark:bg-white ${
          active
            ? 'translate-y-[.625rem] rotate-45 opacity-100 group-hover:opacity-100'
            : 'opacity-100 group-hover:opacity-100'
        }`}
      />
      <div
        className={`ease my-[.1875rem] h-1 w-6 transform rounded-full bg-indigo-500 transition duration-300 dark:bg-white ${
          active ? 'opacity-0' : 'opacity-100 group-hover:opacity-100'
        }`}
      />
      <div
        className={`ease my-[.1875rem] h-1 w-6 transform rounded-full bg-indigo-500 transition duration-300 dark:bg-white ${
          active
            ? '-translate-y-2.5 -rotate-45 opacity-100 group-hover:opacity-100'
            : 'opacity-100 group-hover:opacity-100'
        }`}
      />
    </button>
  )
}

export default Hamburger
