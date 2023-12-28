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
    directus {
      recipes {
        image {
          id
          imageFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
        title
        cook_time
        description
        featured
        id
        ingredients
        instructions
        prep_time
        servings
        status
        tools
        tags {
          tags_id {
            tag_name
          }
        }
      }
    }
  }
`

const DEV = process.env.NODE_ENV === 'development'

const AllRecipes = () => {
  const data = useStaticQuery(query)
  const recipes = data?.allContentfulRecipe?.nodes
  let directusRecipes = data?.directus?.recipes
  if (!DEV) {
    directusRecipes = directusRecipes?.filter(recipe => recipe?.status === 'published')
  }
  const allRecipes = useMemo(() => [...recipes, ...directusRecipes], [recipes, directusRecipes])
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
            <RecipesList recipes={allRecipes} />
          </div>
        )}
      </section>
    </>
  )
}

export default AllRecipes
