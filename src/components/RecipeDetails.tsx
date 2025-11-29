'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BsPieChart } from 'react-icons/bs'
import { GiSandsOfTime } from 'react-icons/gi'
import { MdOutlineTimer } from 'react-icons/md'
import slugify from 'slugify'
import RecipeMultiplier from './RecipeMultiplier'
import decimalToFraction from '../utils/decimalToFraction'
import minutesToHours from '../utils/minutesToHours'
import { Recipe } from '../lib/types'

interface RecipeDetailsProps {
  recipe: Recipe
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  const {
    title,
    cookTime,
    description,
    prepTime,
    servings = 1,
    image,
    ingredients,
    instructions,
    tags,
    tools,
    source,
  } = recipe

  // Check if ingredients are structured (Directus) or strings (Contentful)
  const isStructured =
    source === 'directus' &&
    Array.isArray(ingredients) &&
    ingredients.length > 0 &&
    typeof ingredients[0] !== 'string'

  const [multiplier, setMultiplier] = useState(1)

  const updatedIngredients = isStructured
    ? (ingredients as any[]).map(item => {
        const updatedAmount = item.amount * multiplier
        return {
          ...item,
          amount: updatedAmount,
        }
      })
    : []

  const substituteIngredient = (step: string) => {
    if (!isStructured) return step

    // Find instances of {{1}}, {{2}}, etc...
    const regex = /{{\d+}}/g
    const matches = step.match(regex)
    if (matches) {
      matches.forEach(match => {
        // ingredientIndex is the number within the match and subtract for zero indexing
        const matchResult = match.match(/\d+/)
        if (matchResult) {
          const ingredientIndex = parseInt(matchResult[0]) - 1
          const { amount, measurement, ingredient } =
            (ingredients as any[])[ingredientIndex] || {}
          const replacementPhrase = [
            amount && decimalToFraction(amount * multiplier),
            measurement,
            ingredient,
          ]
            .filter(Boolean)
            .join(' ')
          step = step.replace(match, replacementPhrase)
        }
      })
    }
    return step
  }

  return (
    <>
      <section className="grid gap-12 lg:grid-cols-[4fr_5fr] lg:items-center">
        {image && (
          <div className="relative h-96 w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="">
          <h2>{title}</h2>
          <p className="text-justify">{description}</p>
          <div className="mx-0 my-8 grid grid-cols-3 justify-center gap-4 text-center">
            <div>
              <MdOutlineTimer className="mx-auto mb-2 text-2xl" />
              <h5 className="text-md mb-0 font-semibold">Prep Time</h5>
              <p className="text-md mb-0">{minutesToHours(prepTime)}</p>
            </div>
            <div>
              <GiSandsOfTime className="mx-auto mb-2 text-2xl" />
              <h5 className="text-md mb-0 font-semibold">Cook Time</h5>
              <p className="text-md mb-0">{minutesToHours(cookTime)}</p>
            </div>
            <div>
              <BsPieChart className="mx-auto mb-2 text-2xl" />
              <h5 className="text-md mb-0 font-semibold">Servings</h5>
              <p className="text-md mb-0">
                {servings ? servings * multiplier : 'N/A'}
              </p>
            </div>
          </div>
          <p className="flex flex-wrap items-center font-semibold">
            Tags:
            {tags.map((tag, index) => {
              const tagSlug = slugify(tag, { lower: true })
              return (
                <Link
                  className="m-1 rounded-lg bg-indigo-500 px-2 py-[.05rem] text-white capitalize first:ml-4"
                  href={`/tags/${tagSlug}`}
                  key={index}
                >
                  {tag}
                </Link>
              )
            })}
          </p>
        </div>
      </section>
      <section className="grid gap-x-20 gap-y-8 px-0 py-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <h4>Instructions</h4>
          {instructions &&
            instructions.map((item: any, index: number) => {
              const stepText = typeof item === 'string' ? item : item.step
              return (
                <div key={index}>
                  <header className="grid grid-cols-[auto_1fr] items-center gap-6">
                    <p className="mb-0 font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                      Step {index + 1}
                    </p>
                    <div className="h-px bg-gray-500"></div>
                  </header>
                  <p>{substituteIngredient(stepText)}</p>
                </div>
              )
            })}
        </div>
        <div className="grid gap-y-8">
          <div>
            <h4>Ingredients</h4>
            {isStructured && (
              <>
                <label
                  htmlFor="quantity-input"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Increase Recipe:
                </label>
                <RecipeMultiplier
                  multiplier={multiplier}
                  setMultiplier={setMultiplier}
                />
              </>
            )}

            {isStructured
              ? updatedIngredients.map((item, index) => {
                  const {
                    amount = '',
                    measurement = '',
                    ingredient = '',
                  } = item
                  return (
                    <p
                      key={index}
                      className="border-b border-solid border-gray-500 pb-3"
                    >
                      {`${
                        isNaN(amount) ? '' : decimalToFraction(amount)
                      } ${measurement} ${ingredient}`}
                    </p>
                  )
                })
              : (ingredients as string[])?.map((item, index) => (
                  <p
                    key={index}
                    className="border-b border-solid border-gray-500 pb-3"
                  >
                    {item}
                  </p>
                ))}
          </div>
          <div>
            <h4>Tools</h4>
            {tools &&
              tools.map((item: any, index: number) => {
                const toolName = typeof item === 'string' ? item : item.tool
                return (
                  <p
                    key={index}
                    className="border-b border-solid border-gray-500 pb-3 text-indigo-600 capitalize dark:text-indigo-400"
                  >
                    {toolName}
                  </p>
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}

export default RecipeDetails
