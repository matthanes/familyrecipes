import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { motion } from "framer-motion"

import "normalize.css"
import "../assets/css/main.css"

const Layout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      <motion.main
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{
          type: "spring",
          mass: 0.35,
          stiffness: 75,
          duration: 0.15,
        }}
      >
        {children}
      </motion.main>
      <Footer></Footer>
    </>
  )
}

export default Layout
