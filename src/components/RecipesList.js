import React, { useState } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import slugify from 'slugify'
import minutesToHours from '../utils/minutesToHours'

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const getPaginationNumbers = (currentPage, totalPages) => {
  const numbers = []

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

const RecipesList = ({ recipes = [] }) => {
  // sort recipes alphabetically by title
  recipes.sort((a, b) => {
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
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
  const totalPages = Math.ceil(recipes.length / recipesPerPage)

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
      {totalPages > 1 && (
        <section className="my-8">
          <ul className="inline-flex">
            <li>
              <button
                className="focus:shadow-outline h-10 rounded-l-lg border border-r-0 border-indigo-600 px-4 py-2 text-white transition-all duration-300 hover:bg-indigo-600 disabled:bg-transparent disabled:text-gray-600"
                disabled={currentPage === 1}
                onClick={prevPage}
                aria-label="Previous Page"
              >
                <BsChevronLeft />
              </button>
            </li>
            {/* create a button for each page */}
            {getPaginationNumbers(currentPage, totalPages).map(
              (number, index) => {
                return number === '...' ? (
                  <li
                    className="h-10 border border-r-0 border-indigo-600 px-4 text-white"
                    key={index}
                  >
                    ...
                  </li>
                ) : (
                  <li key={index}>
                    <button
                      className={`focus:shadow-outline h-10 border border-r-0 border-indigo-600 px-4 py-2 text-white transition-all duration-300 hover:bg-indigo-600 ${
                        currentPage === number && 'bg-indigo-600'
                      }`}
                      onClick={() => {
                        setCurrentPage(number)
                      }}
                    >
                      {number}
                    </button>
                  </li>
                )
              }
            )}
            <li>
              <button
                className="focus:shadow-outline h-10 rounded-r-lg border border-indigo-600 px-4 py-2 text-white transition-all duration-300 hover:bg-indigo-600 disabled:bg-transparent disabled:text-gray-600"
                disabled={currentPage === totalPages}
                onClick={nextPage}
                aria-label="Next Page"
              >
                <BsChevronRight />
              </button>
            </li>
          </ul>
        </section>
      )}
      <section className="recipes-list grid gap-x-4 gap-y-8 pb-12 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr]">
        {currentRecipes.length > 0 ? (
          currentRecipes.map(recipe => {
            let { id, title, image, prepTime, cookTime } = recipe
            const pathToImage = getImage(image?.imageFile ?? image)
            const slug = slugify(title, { lower: true })
            if (cookTime === undefined) {
              cookTime = recipe.cook_time
            }
            if (prepTime === undefined) {
              prepTime = recipe.prep_time
            }

            return (
              <Link to={`/${slug}`} className="block" key={id}>
                {pathToImage && (
                  <GatsbyImage
                    image={pathToImage}
                    className="h-60 rounded-lg"
                    alt={title}
                  />
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
    </>
  )
}

export default RecipesList
