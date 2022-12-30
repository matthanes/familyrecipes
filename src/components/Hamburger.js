import React from 'react'

const Hamburger = ({ handleClick, active }) => {
  return (
    <button
      className="hover:bg-secondary flex flex-col rounded p-3 text-zinc-700 outline-none dark:text-white dark:hover:text-white lg:hidden"
      onClick={handleClick}
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
            ? '-translate-y-[.625rem] -rotate-45 opacity-100 group-hover:opacity-100'
            : 'opacity-100 group-hover:opacity-100'
        }`}
      />
    </button>
  )
}

export default Hamburger
