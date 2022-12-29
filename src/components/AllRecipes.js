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
        prepTime
        cookTime
        title
        content {
          tags
        }
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  }
`

const AllRecipes = () => {
  const data = useStaticQuery(query)
  const recipes = data.allContentfulRecipe.nodes

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
      <h2>All Recipes</h2>
      <SearchBar handleChange={handleChange} searchTerm={searchTerm} />
      <section className="grid gap-y-8 gap-x-4 lg:grid-cols-[200px_1fr] lg:gap-[1rem]">
        <TagsList />
        {searchTerm.length > 0 ? (
          <div>
            <h3>Search Results</h3>
            <RecipesList recipes={searchResults} />
          </div>
        ) : (
          <div>
            <h3>Featured Recipes</h3>
            <RecipesList recipes={recipes} />
          </div>
        )}
      </section>
    </>
  )
}

export default AllRecipes
