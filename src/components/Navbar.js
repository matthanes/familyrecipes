import React, { useState } from 'react'
import { Link } from 'gatsby'
import Hamburger from './Hamburger'

const Navbar = () => {
  const [show, setShow] = useState(false)

  const links = [
    { to: '/', text: 'Home' },
    { to: '/allrecipes', text: 'Recipes' },
    { to: '/tags', text: 'Tags' },
    { to: 'https://admin.recipes.matthanesprojects.com', text: 'Login' },
  ]

  return (
    <nav className="flex items-center justify-center lg:h-24">
      <div className="w-[90vw] max-w-7xl lg:flex lg:items-center">
        <div className="flex h-20 w-full items-center justify-between lg:mr-8 lg:h-auto lg:p-0">
          <Link to="/">
            <img
              src="https://matthanesprojects.com/recipes/static/logo-e1ae3d018c63c4e3953de658c9c0fd01.svg"
              alt="Family Recipes logo"
            />
          </Link>
          <Hamburger handleClick={() => setShow(!show)} active={show} />
        </div>
        <div
          className={
            show
              ? 'flex h-64 flex-col overflow-hidden transition-all duration-300 ease-in-out lg:h-auto lg:w-full lg:flex-row lg:items-center'
              : 'flex h-0 flex-col overflow-hidden transition-all duration-300 ease-in-out lg:h-auto lg:w-full lg:flex-row lg:items-center lg:justify-end'
          }
        >
          {links.map((link, index) => {
            if (link.to.includes('http')) {
              return (
                <a
                  href={link.to}
                  key={index}
                  className='lg:hover:text-white" activeClassName="bg-indigo-500 block rounded-lg border-t-[1px] border-solid border-gray-500 px-0 py-4 text-center text-2xl font-medium capitalize tracking-wide text-white transition-all duration-300 ease-in-out lg:mr-4 lg:rounded-lg lg:border-t-0 lg:px-2
                lg:py-1 lg:text-lg lg:hover:bg-indigo-500'
                  onClick={() => setShow(false)}
                >
                  {link.text}
                </a>
              )
            }
            return (
              <Link
                to={link.to}
                key={index}
                className='lg:hover:text-white" activeClassName="bg-indigo-500 block rounded-lg border-t-[1px] border-solid border-gray-500 px-0 py-4 text-center text-2xl font-medium capitalize tracking-wide text-white transition-all duration-300 ease-in-out lg:mr-4 lg:rounded-lg lg:border-t-0 lg:px-2
                lg:py-1 lg:text-lg lg:hover:bg-indigo-500'
                onClick={() => setShow(false)}
              >
                {link.text}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
