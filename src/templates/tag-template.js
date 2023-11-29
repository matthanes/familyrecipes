import React from 'react'
import { graphql } from 'gatsby'
import RecipesList from '../components/RecipesList'
import Layout from '../components/Layout'

const TagTemplate = ({ data, pageContext }) => {
  const recipes = data.allContentfulRecipe.nodes
  const directusRecipes = data.directus.recipes
  directusRecipes.forEach(recipe => {
    recipe.content = {}
    recipe.content.tags = recipe.tags
  })
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
      recipes(filter: {_and: [{status: {_eq: "published"}}, {tags: {tags_id: {tag_name: {_icontains: $tag}}}}]}) {
        title
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
