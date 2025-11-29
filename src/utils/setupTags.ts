import { Recipe } from '../lib/types'

const setupTags = (recipes: Recipe[]) => {
  const allTags: Record<string, number> = {}

  recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      const normalizedTag = tag.toLowerCase()
      if (allTags[normalizedTag]) {
        allTags[normalizedTag] = allTags[normalizedTag] + 1
      } else {
        allTags[normalizedTag] = 1
      }
    })
  })
  const newTags = Object.entries(allTags).sort((a, b) => {
    const [firstTag] = a
    const [secondTag] = b
    return firstTag.localeCompare(secondTag)
  })

  return newTags
}

export default setupTags
