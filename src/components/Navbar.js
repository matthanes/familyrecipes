import React, { useState } from "react"
import { Link } from "gatsby"
import { FiAlignJustify } from "react-icons/fi"
import logo from "../assets/images/logo.svg"

const Navbar = () => {
  const [show, setShow] = useState(false)

  return (
    <nav className="flex items-center justify-center">
      <div className="w-[90vw] max-w-7xl">
        <div className="h-24 flex w-full justify-between items-center">
          <Link to="/">
            <img
              className="w-52 ml-[-6px] mb-[-9px]"
              src={logo}
              alt="Family Recipes"
            />
          </Link>
          <button className="py-1 px-3" onClick={() => setShow(!show)}>
            <FiAlignJustify className="text-2xl " />
          </button>
        </div>
        <div
          className={
            show
              ? "overflow-hidden flex flex-col transition-all ease-in-out duration-75 h-52"
              : "h-0 overflow-hidden flex flex-col transition-all ease-in-out duration-75"
          }
        >
          <Link
            to="/"
            className="block text-center text-2xl capitalize text-gray-600 tracking-wide py-4 px-0 border-solid border-t-[1px] border-gray-500 transition-all ease-in-out duration-75"
            activeClassName="text-purple-600"
            onClick={() => setShow(false)}
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className="block text-center text-2xl capitalize text-gray-600 tracking-wide py-4 px-0 border-solid border-t-[1px] border-gray-500 transition-all ease-in-out duration-75"
            activeClassName="text-purple-600"
            onClick={() => setShow(false)}
          >
            Recipes
          </Link>
          <Link
            to="/tags"
            className="block text-center text-2xl capitalize text-gray-600 tracking-wide py-4 px-0 border-solid border-t-[1px] border-gray-500 transition-all ease-in-out duration-75"
            activeClassName="text-purple-600"
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
