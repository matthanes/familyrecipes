import React from 'react'
import AllRecipes from '../../components/AllRecipes'
import { getAllRecipes } from '../../lib/utils'

export default async function AllRecipesPage() {
  const recipes = await getAllRecipes()

  return (
    <div className="px-4 py-8 lg:px-8">
      <AllRecipes recipes={recipes} />
    </div>
  )
}
