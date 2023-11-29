import React, { useState, useEffect, useMemo, useRef } from 'react'
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
    directus {
      recipes (filter: {status: {_eq: "published"}}) {
        image {
          id
          imageFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        id
        title
        cook_time
        prep_time
        featured
        servings
        status
      }
    }
  }
`

const FeaturedRecipes = () => {
  const data = useStaticQuery(query)
  const recipes = data?.allContentfulRecipe?.nodes
  const directusRecipes = data?.directus?.recipes
  const allRecipes = useMemo(() => [...recipes, ...directusRecipes], [recipes, directusRecipes])
  const featuredRecipes = useMemo(
    () => allRecipes?.filter(recipe => recipe?.featured === true),
    [allRecipes]
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(allRecipes)
  const handleChange = event => {
    setSearchTerm(event?.target?.value)
  }
  const allRecipesRef = useRef(allRecipes)
  useEffect(() => {
    const results = allRecipesRef.current?.filter(recipe =>
      recipe?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }, [searchTerm, allRecipesRef])

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
