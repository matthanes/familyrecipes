import { createDirectus, rest, readItems, staticToken } from '@directus/sdk'
import { Recipe } from './types'
import slugify from 'slugify'

const DIRECTUS_URL = process.env.DIRECTUS_URL || ''
const DIRECTUS_TOKEN = process.env.DIRECTUS_ACCESS_TOKEN || ''

const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest())

export async function getAllDirectusRecipes(): Promise<Recipe[]> {
  try {
    const recipes = await client.request(
      readItems('recipes', {
        fields: ['*', 'tags.tags_id.tag_name', 'image.*'],
        filter: {
          status: {
            _eq: 'published',
          },
        },
      }),
    )

    return recipes.map((recipe: any) => {
      const imageId = recipe.image?.id || recipe.image // Depending on how deep the fetch is
      const imageUrl = imageId ? `${DIRECTUS_URL}/assets/${imageId}` : null

      const tags =
        recipe.tags?.map((t: any) => t.tags_id?.tag_name).filter(Boolean) || []

      return {
        id: recipe.id.toString(),
        title: recipe.title,
        cookTime: recipe.cook_time || 0,
        prepTime: recipe.prep_time || 0,
        image: imageUrl,
        tags,
        source: 'directus',
        slug: slugify(recipe.title, { lower: true }),
        featured: recipe.featured || false,
        servings: recipe.servings,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        tools: recipe.tools,
      }
    })
  } catch (error) {
    console.error('Error fetching Directus recipes:', error)
    return []
  }
}
