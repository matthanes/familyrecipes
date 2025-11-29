import { notFound } from 'next/navigation'
import RecipeDetails from '../../components/RecipeDetails'
import { getAllRecipes } from '../../lib/utils'

export async function generateStaticParams() {
  const recipes = await getAllRecipes()
  return recipes.map(recipe => ({
    slug: recipe.slug,
  }))
}

export default async function RecipePage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params
  const recipes = await getAllRecipes()
  const recipe = recipes.find(r => r.slug === slug)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="px-4 py-8 lg:px-8">
      <RecipeDetails recipe={recipe} />
    </div>
  )
}
