import React from 'react'
import { graphql } from 'gatsby'
import RecipesList from '../components/RecipesList'
import Layout from '../components/Layout'

const DEV = process.env.NODE_ENV === 'development'

const TagTemplate = ({ data, pageContext }) => {
  const recipes = data.allContentfulRecipe.nodes
  let directusRecipes = data.directus.recipes

  directusRecipes = directusRecipes.reduce((filteredRecipes, recipe) => {
    recipe.content = { tags: recipe.tags }

    if (DEV || recipe.status === 'published') {
      filteredRecipes.push(recipe)
    }

    return filteredRecipes
  }, [])

  const allRecipes = [...directusRecipes, ...recipes]
  return (
    <Layout>
      <h2>{pageContext.tag}</h2>
      <div>
        <RecipesList recipes={allRecipes} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getRecipeByTag($tag: String) {
    allContentfulRecipe(
      sort: { title: ASC }
      filter: { content: { tags: { eq: $tag } } }
    ) {
      nodes {
        title
        id
        cookTime
        prepTime
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
    directus {
      recipes(
        filter: { tags: { tags_id: { tag_name: { _icontains: $tag } } } }
      ) {
        title
        status
        id
        cook_time
        prep_time
        tags {
          tags_id {
            tag_name
          }
        }
        image {
          id
          imageFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`

export default TagTemplate
