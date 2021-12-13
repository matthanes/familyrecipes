import React from "react"

const Footer = () => {
  return (
    <footer className="text-center h-16 flex items-center justify-center bg-zinc-800 text-white">
      <p>
        &copy; {new Date().getFullYear()} <span className="text-indigo-400">FamilyRecipes</span>
      </p>
    </footer>
  )
}

export default Footer
