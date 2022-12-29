import React, { useState, useEffect } from 'react'
import TagsList from './TagsList'
import RecipesList from './RecipesList'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  {
    allContentfulRecipe(sort: { title: ASC }) {
      nodes {
        id
        title
        cookTime
        prepTime
        featured
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      totalCount
    }
  }
`

const FeaturedRecipes = () => {
  const data = useStaticQuery(query)
  const recipes = data.allContentfulRecipe.nodes
  const featuredRecipes = recipes.filter(recipe => recipe.featured)

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }
  useEffect(() => {
    const results = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }, [searchTerm, recipes])

  return (
    <section className="grid gap-y-8 gap-x-4 lg:grid-cols-[200px_1fr] lg:gap-[1rem]">
      <TagsList />
      <div>
        <div>
          <input
            type="text"
            placeholder="Search Recipes"
            value={searchTerm}
            onChange={handleChange}
            className="dark:text-gray-3 mt-2 w-full rounded-lg border border-indigo-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-600 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-300 dark:placeholder-gray-400"
          />
        </div>

        {/* If there is a search term, show searchResults otherwise show featured Recipes */}
        {searchTerm.length > 0 ? (
          <>
            <h3 className="mt-8">Search Results</h3>
            <RecipesList recipes={searchResults} />
          </>
        ) : (
          <>
            <h3 className="mt-8">Featured Recipes</h3>
            <RecipesList recipes={featuredRecipes} />
          </>
        )}
      </div>
    </section>
  )
}

export default FeaturedRecipes
