import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

interface RecipeMultiplierProps {
  multiplier: number
  setMultiplier: React.Dispatch<React.SetStateAction<number>>
}

const RecipeMultiplier: React.FC<RecipeMultiplierProps> = ({
  multiplier,
  setMultiplier,
}) => {
  const increaseQuantity = () => {
    setMultiplier(prevQuantity => prevQuantity + 1)
  }

  const decreaseQuantity = () => {
    if (multiplier > 1) {
      setMultiplier(prevQuantity => prevQuantity - 1)
    }
  }

  return (
    <>
      <div className="relative flex max-w-32 items-center">
        <button
          onClick={decreaseQuantity}
          aria-label="decrease multiplier"
          disabled={multiplier === 1}
          className="focus:shadow-outline h-10 rounded-l-lg border border-r-0 border-indigo-600 px-4 py-2 text-slate-800 transition-all duration-300 hover:bg-indigo-600 hover:text-white disabled:bg-transparent disabled:text-gray-400 dark:text-white dark:disabled:text-gray-600"
        >
          <span className="m-auto text-2xl font-thin">
            <FaMinus />
          </span>
        </button>
        <input
          type="number"
          id="quantity-input"
          min={1}
          step={1}
          value={multiplier}
          readOnly
          aria-describedby="helper-text-explanation"
          className="dark:border=0 h-10 w-16 [appearance:textfield] border border-r-0 border-indigo-600 bg-transparent py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          onClick={increaseQuantity}
          aria-label="increase multiplier"
          className="focus:shadow-outline h-10 rounded-r-lg border border-indigo-600 px-4 py-2 text-slate-800 transition-all duration-300 hover:bg-indigo-600 hover:text-white disabled:bg-transparent disabled:text-gray-400 dark:text-white dark:disabled:text-gray-600"
        >
          <span className="m-auto text-2xl font-thin">
            <FaPlus />
          </span>
        </button>
      </div>
      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      >
        Select a number to multiply ingredients.
      </p>
    </>
  )
}

export default RecipeMultiplier
