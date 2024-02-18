import React, { useState, useEffect } from 'react'

const Toast = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    isVisible && (
      <div
        className="fixed bottom-0 right-0 m-4 rounded-lg bg-gray-800 p-4 text-white"
        style={{ zIndex: 1000 }}
      >
        <p className="text-center">{message}</p>
      </div>
    )
  )
}

export default Toast
