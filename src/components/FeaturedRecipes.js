import React, { useState, useEffect } from 'react'
import TagsList from './TagsList'
import RecipesList from './RecipesList'
import SearchBar from './SearchBar'
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
    <>
      <SearchBar handleChange={handleChange} searchTerm={searchTerm} />
      <section className="grid gap-y-8 gap-x-4 lg:grid lg:grid-cols-[200px_1fr] lg:gap-[1rem]">
        <TagsList />
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
