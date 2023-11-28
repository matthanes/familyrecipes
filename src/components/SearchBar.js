import React, {useRef} from 'react'

const SearchBar = ({ handleChange, searchTerm }) => {
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current && inputRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <input
      type="text"
      placeholder="Search Recipes"
      value={searchTerm}
      onChange={handleChange}
      onClick={handleClick}
      ref={inputRef}
      className="mb-4 mt-2 w-full rounded-lg border border-indigo-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-600 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-gray-300 dark:placeholder-gray-400 lg:mb-8"
    />
  )
}

export default SearchBar
