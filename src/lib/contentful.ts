import { createClient } from 'contentful'
import { Recipe } from './types'
import slugify from 'slugify'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
})

export async function getAllContentfulRecipes(): Promise<Recipe[]> {
  const entries = await client.getEntries({
    content_type: 'recipe',
  })

  return entries.items.map((item: any) => {
    const fields = item.fields
    const image = fields.image?.fields?.file?.url
      ? `https:${fields.image.fields.file.url}`
      : null

    return {
      id: item.sys.id,
      title: fields.title,
      cookTime: fields.cookTime || 0,
      prepTime: fields.prepTime || 0,
      image,
      tags: fields.content?.tags || [],
      source: 'contentful',
      slug: slugify(fields.title, { lower: true }),
      featured: fields.featured || false,
      servings: fields.servings,
      description: fields.description,
      ingredients: fields.content?.ingredients,
      instructions: fields.content?.instructions,
      tools: fields.content?.tools,
    }
  })
}
