import React, { useState } from 'react'
import { Link } from 'gatsby'
import { FiAlignJustify } from 'react-icons/fi'
import { StaticImage } from 'gatsby-plugin-image'

const Navbar = () => {
  const [show, setShow] = useState(false)

  return (
    <nav className="flex items-center justify-center lg:h-24">
      <div className="w-[90vw] max-w-7xl lg:flex lg:items-center">
        <div className="flex h-24 w-full items-center justify-between lg:mr-8 lg:h-auto lg:p-0">
          <Link to="/">
            <img
              className="ml-[-6px] mb-[-9px] w-52"
              src="https://matthanesprojects.com/recipes/static/logo-e1ae3d018c63c4e3953de658c9c0fd01.svg"
              alt="Family Recipes logo"
            />
            {/* <StaticImage
            src="../assets/images/logodark.svg"
            alt="Family Recipes logo"
            className="w-52 ml-[-6px] mb-[-9px]"
            placeholder="blurred"
          /> */}
          </Link>
          <button
            className="py-1 px-3 lg:hidden"
            onClick={() => setShow(!show)}
          >
            <FiAlignJustify className="text-2xl " />
          </button>
        </div>
        <div
          className={
            show
              ? 'flex h-52 flex-col overflow-hidden transition-all duration-300 ease-in-out lg:h-auto lg:w-full lg:flex-row lg:items-center'
              : 'flex h-0 flex-col overflow-hidden transition-all duration-300 ease-in-out lg:h-auto lg:w-full lg:flex-row lg:items-center lg:justify-end'
          }
        >
          <Link
            to="/"
            className="block border-t-[1px] border-solid border-gray-500 py-4 px-0 text-center text-2xl font-medium capitalize 
            tracking-wide transition-all duration-300 ease-in-out lg:mr-4 lg:rounded-lg lg:border-t-0 lg:px-2 lg:py-1 lg:text-lg lg:hover:bg-indigo-500 lg:hover:text-white"
            activeClassName="bg-indigo-500 text-white rounded-lg"
            onClick={() => setShow(false)}
          >
            Home
          </Link>
          <Link
            to="/allrecipes"
            className="block border-t-[1px] border-solid border-gray-500 py-4 px-0 text-center text-2xl font-medium capitalize 
            tracking-wide transition-all duration-300 ease-in-out lg:mr-4 lg:rounded-lg lg:border-t-0 lg:px-2 lg:py-1 lg:text-lg lg:hover:bg-indigo-500 lg:hover:text-white"
            activeClassName="bg-indigo-500 text-white rounded-lg"
            onClick={() => setShow(false)}
          >
            Recipes
          </Link>
          <Link
            to="/tags"
            className="block border-t-[1px] border-solid border-gray-500 py-4 px-0 text-center text-2xl font-medium capitalize 
            tracking-wide transition-all duration-300 ease-in-out lg:mr-4 lg:rounded-lg lg:border-t-0 lg:px-2 lg:py-1 lg:text-lg lg:hover:bg-indigo-500 lg:hover:text-white"
            activeClassName="bg-indigo-500 text-white rounded-lg"
            onClick={() => setShow(false)}
          >
            Tags
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
