'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import TagsList from './TagsList'
import RecipesList from './RecipesList'
import SearchBar from './SearchBar'
import { Recipe } from '../lib/types'

interface FeaturedRecipesProps {
  recipes: Recipe[]
}

const FeaturedRecipes: React.FC<FeaturedRecipesProps> = ({ recipes }) => {
  const featuredRecipes = useMemo(
    () => recipes.filter(recipe => recipe.featured === true),
    [recipes],
  )
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const searchResults = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <SearchBar handleChange={handleChange} searchTerm={searchTerm} />
      <section className="grid gap-x-4 gap-y-8 lg:grid lg:grid-cols-[200px_1fr] lg:gap-[1rem]">
        <TagsList recipes={recipes} />
        {/* If there is a search term, show searchResults otherwise show featured Recipes */}
        {searchTerm.length > 0 ? (
          <div>
            <h3>Search Results</h3>
            <RecipesList recipes={searchResults} />
          </div>
        ) : (
          <div>
            <h3>Featured Recipes</h3>
            <RecipesList recipes={featuredRecipes} />
          </div>
        )}
      </section>
    </>
  )
}

export default FeaturedRecipes
