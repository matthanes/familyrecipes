import React, { useState } from "react"
import { Link } from "gatsby"
import { FiAlignJustify } from "react-icons/fi"
import { StaticImage } from "gatsby-plugin-image"

const Navbar = () => {
  const [show, setShow] = useState(false)
  
  return (
    <nav className="flex items-center justify-center lg:h-24">
      <div className="w-[90vw] max-w-7xl lg:flex lg:items-center">
        <div className="h-24 flex w-full justify-between items-center lg:p-0 lg:mr-8 lg:h-auto">
          <Link to="/">
          <StaticImage
            src="../assets/images/logodark.svg"
            alt="Family Recipes logo"
            className="w-52 ml-[-6px] mb-[-9px]"
            placeholder="blurred"
          />
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
              ? "h-52 overflow-hidden flex flex-col transition-all ease-in-out duration-300 lg:h-auto lg:flex-row lg:items-center lg:w-full"
              : "h-0 overflow-hidden flex flex-col transition-all ease-in-out duration-300 lg:h-auto lg:flex-row lg:items-center lg:w-full lg:justify-end"
          }
        >
          <Link
            to="/"
            className="block text-center text-2xl font-medium capitalize tracking-wide py-4 px-0 border-solid border-t-[1px] 
            border-gray-500 transition-all ease-in-out duration-300 lg:px-2 lg:py-1 lg:border-t-0 lg:mr-4 lg:text-lg lg:hover:bg-indigo-500 lg:hover:text-white lg:rounded-lg"
            activeClassName="bg-indigo-500 text-white rounded-lg"
            onClick={() => setShow(false)}
          >
            Home
          </Link>
          <Link
            to="/allrecipes"
            className="block text-center text-2xl font-medium capitalize tracking-wide py-4 px-0 border-solid border-t-[1px] 
            border-gray-500 transition-all ease-in-out duration-300 lg:px-2 lg:py-1 lg:border-t-0 lg:mr-4 lg:text-lg lg:hover:bg-indigo-500 lg:hover:text-white lg:rounded-lg"
            activeClassName="bg-indigo-500 text-white rounded-lg"
            onClick={() => setShow(false)}
          >
            Recipes
          </Link>
          <Link
            to="/tags"
            className="block text-center text-2xl font-medium capitalize tracking-wide py-4 px-0 border-solid border-t-[1px] 
            border-gray-500 transition-all ease-in-out duration-300 lg:px-2 lg:py-1 lg:border-t-0 lg:mr-4 lg:text-lg lg:hover:bg-indigo-500 lg:hover:text-white lg:rounded-lg"
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
