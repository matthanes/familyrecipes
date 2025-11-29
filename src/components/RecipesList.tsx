'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import minutesToHours from '../utils/minutesToHours'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { Recipe } from '../lib/types'

const getPaginationNumbers = (currentPage: number, totalPages: number) => {
  const numbers: (number | string)[] = []

  numbers.push(1)
  if (currentPage > 3) {
    numbers.push('...')
  }

  if (currentPage > 2) {
    numbers.push(currentPage - 1)
  }
  if (currentPage > 1 && currentPage < totalPages) {
    numbers.push(currentPage)
  }
  if (currentPage < totalPages - 1) {
    numbers.push(currentPage + 1)
  }

  if (currentPage < totalPages - 2) {
    numbers.push('...')
  }
  numbers.push(totalPages)

  return numbers
}

interface RecipesListProps {
  recipes: Recipe[]
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  prevPage: () => void
  nextPage: () => void
  setCurrentPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null
  return (
    <section className="my-8">
      <ul className="inline-flex">
        <li>
          <button
            className="focus:shadow-outline h-10 rounded-l-lg border border-r-0 border-indigo-600 px-4 py-2 text-slate-800 transition-all duration-300 hover:bg-indigo-600 hover:text-white disabled:bg-transparent disabled:text-gray-400 dark:text-white dark:disabled:text-gray-600"
            disabled={currentPage === 1}
            onClick={prevPage}
            aria-label="Previous Page"
          >
            <BsChevronLeft />
          </button>
        </li>
        {/* create a button for each page */}
        {getPaginationNumbers(currentPage, totalPages).map((number, index) => {
          return number === '...' ? (
            <li
              className="light:text-white h-10 border border-r-0 border-indigo-600 px-4"
              key={index}
            >
              ...
            </li>
          ) : (
            <li key={index}>
              <button
                className={`focus:shadow-outline h-10 border border-r-0 border-indigo-600 px-4 py-2 transition-all duration-300 hover:bg-indigo-600 hover:text-white dark:text-white ${
                  currentPage === number && 'bg-indigo-600 text-white'
                }`}
                onClick={() => {
                  setCurrentPage(number as number)
                }}
              >
                {number}
              </button>
            </li>
          )
        })}
        <li>
          <button
            className="focus:shadow-outline h-10 rounded-r-lg border border-indigo-600 px-4 py-2 text-slate-800 transition-all duration-300 hover:bg-indigo-600 hover:text-white disabled:bg-transparent disabled:text-gray-400 dark:text-white dark:disabled:text-gray-600"
            disabled={currentPage === totalPages}
            onClick={nextPage}
            aria-label="Next Page"
          >
            <BsChevronRight />
          </button>
        </li>
      </ul>
    </section>
  )
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes = [] }) => {
  // sort recipes alphabetically by title
  // Note: Sorting should ideally be done on server or parent, but keeping logic here for now
  const sortedRecipes = [...recipes].sort((a, b) => {
    const aTitle = a.title.toLowerCase()
    const bTitle = b.title.toLowerCase()
    if (aTitle < bTitle) return -1
    if (aTitle > bTitle) return 1
    return 0
  })

  const [currentPage, setCurrentPage] = useState(1)
  const recipesPerPage = 6

  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipes = sortedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe,
  )
  const totalPages = Math.ceil(sortedRecipes.length / recipesPerPage)

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        setCurrentPage={setCurrentPage}
      />
      <section className="recipes-list grid gap-x-4 gap-y-8 pb-12 sm:grid-cols-2 sm:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
        {currentRecipes.length > 0 ? (
          currentRecipes.map(recipe => {
            const { id, title, image, prepTime, cookTime, slug } = recipe

            return (
              <Link href={`/${slug}`} className="block" key={id}>
                {image && (
                  <div className="relative h-60 w-full">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <h5 className="mb-0 mt-1 font-semibold leading-none text-zinc-700 dark:text-slate-200 xl:text-xl">
                  {title}
                </h5>
                <p className="mb-0 mt-2 leading-none text-zinc-700 dark:text-slate-200">
                  Prep : {minutesToHours(prepTime)} | Cook Time :{' '}
                  {minutesToHours(cookTime)}
                </p>
              </Link>
            )
          })
        ) : (
          <h4 className="col-span-4 text-zinc-700 dark:text-slate-200">
            No recipes matching that search.
          </h4>
        )}
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default RecipesList
