import { getAllContentfulRecipes } from './contentful'
import { getAllDirectusRecipes } from './directus'
import { Recipe } from './types'

export async function getAllRecipes(): Promise<Recipe[]> {
  const [contentfulRecipes, directusRecipes] = await Promise.all([
    getAllContentfulRecipes(),
    getAllDirectusRecipes(),
  ])

  return [...contentfulRecipes, ...directusRecipes].sort((a, b) =>
    a.title.localeCompare(b.title),
  )
}

export function getUniqueTags(recipes: Recipe[]): string[] {
  const tags = new Set<string>()
  recipes.forEach(recipe => {
    recipe.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}
