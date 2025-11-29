import React from 'react'

const Footer = () => {
  return (
    <footer className="flex h-16 items-center justify-center bg-zinc-900 text-center text-white">
      <p className="mb-0">
        &copy; {new Date().getFullYear()}{' '}
        <span className="text-indigo-400">FamilyRecipes</span>
      </p>
    </footer>
  )
}

export default Footer
