'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Hamburger from './Hamburger'
import Image from 'next/image'
import recipesLogo from '../assets/images/recipeslogo.svg'

const Navbar = () => {
  const [show, setShow] = useState(false)
  const pathname = usePathname()

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
          <Link href="/">
            <Image
              src={recipesLogo}
              alt="Family Recipes logo"
              width={200} // Adjust width/height as needed
              height={50}
              className="h-12 w-auto" // Tailwind to control size
            />
          </Link>
          <button
            className="rounded-lg border-t-[1px] border-none bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 lg:hidden"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(window.location.href)
                alert('Link copied to clipboard')
              } catch (err) {
                console.error('Failed to copy text: ', err)
              }
            }}
          >
            Copy Link
          </button>
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
            const isActive = pathname === link.to
            const activeClass = isActive ? 'bg-indigo-500 text-white' : ''

            if (link.to.includes('http')) {
              return (
                <a
                  href={link.to}
                  key={index}
                  className={`block rounded-lg border-t-[1px] border-solid border-gray-500 px-0 py-4 text-center text-2xl font-medium capitalize tracking-wide transition-all duration-300 ease-in-out dark:text-white lg:mr-4 lg:rounded-lg lg:border-t-0 lg:px-2 lg:py-1 lg:text-lg lg:hover:bg-indigo-500 lg:hover:text-white ${activeClass}`}
                  onClick={() => setShow(false)}
                >
                  {link.text}
                </a>
              )
            }
            return (
              <Link
                href={link.to}
                key={index}
                className={`block rounded-lg border-t-[1px] border-solid border-gray-500 px-0 py-4 text-center text-2xl font-medium capitalize tracking-wide transition-all duration-300 ease-in-out dark:text-white lg:mr-4 lg:rounded-lg lg:border-t-0 lg:px-2 lg:py-1 lg:text-lg lg:hover:bg-indigo-500 lg:hover:text-white ${activeClass}`}
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
