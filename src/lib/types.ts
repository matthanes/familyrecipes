export interface Recipe {
  id: string
  title: string
  cookTime: number // in minutes
  prepTime: number // in minutes
  image: string | null // URL
  tags: string[]
  source: 'contentful' | 'directus'
  slug: string
  featured?: boolean
  ingredients?:
    | string[]
    | { amount: number; measurement: string; ingredient: string }[]
  instructions?: string[] | { step: string }[]
  tools?: string[] | { tool: string }[]
  servings?: number
  description?: string
}

export interface Tag {
  name: string
  slug: string
}
