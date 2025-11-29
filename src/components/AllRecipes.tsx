'use client'

import React, { useState, useEffect } from 'react'
import TagsList from './TagsList'
import RecipesList from './RecipesList'
import SearchBar from './SearchBar'
import { Recipe } from '../lib/types'

interface AllRecipesProps {
  recipes: Recipe[]
}

const AllRecipes: React.FC<AllRecipesProps> = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const searchResults = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <h2>All Recipes</h2>
      <SearchBar handleChange={handleChange} searchTerm={searchTerm} />
      <section className="grid gap-x-4 gap-y-8 lg:grid-cols-[200px_1fr] lg:gap-4">
        <TagsList recipes={recipes} />
        {searchTerm.length > 0 ? (
          <div>
            <h3>Search Results</h3>
            <RecipesList recipes={searchResults} />
          </div>
        ) : (
          <div>
            <RecipesList recipes={recipes} />
          </div>
        )}
      </section>
    </>
  )
}

export default AllRecipes
