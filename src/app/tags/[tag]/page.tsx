import React from 'react'
import RecipesList from '../../../components/RecipesList'
import { getAllRecipes, getUniqueTags } from '../../../lib/utils'
import slugify from 'slugify'

export async function generateStaticParams() {
  const recipes = await getAllRecipes()
  const tags = getUniqueTags(recipes)

  return tags.map(tag => ({
    tag: slugify(tag, { lower: true }),
  }))
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = await params
  const recipes = await getAllRecipes()

  const filteredRecipes = recipes.filter(recipe => {
    return recipe.tags.some(t => slugify(t, { lower: true }) === tag)
  })

  // Find the original tag name for display
  const originalTag =
    recipes
      .flatMap(r => r.tags)
      .find(t => slugify(t, { lower: true }) === tag) || tag

  return (
    <div className="px-4 py-8 lg:px-8">
      <h2 className="capitalize">{originalTag}</h2>
      <div>
        <RecipesList recipes={filteredRecipes} />
      </div>
    </div>
  )
}
