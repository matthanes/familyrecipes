import React from "react"
import { graphql } from "gatsby"
import RecipesList from "../components/RecipesList"

const TagTemplate = ({ data, pageContext }) => {
  const recipes = data.allContentfulRecipe.nodes
  console.log(recipes)
  return (
    <>
      <main>
        <h2>{pageContext.tag}</h2>
        <div>
          <RecipesList recipes={recipes} />
        </div>
      </main>
    </>
  )
}

export const query = graphql`
  query getRecipeByTag($tag: String) {
    allContentfulRecipe(
      sort: { fields: title, order: ASC }
      filter: { content: { tags: { eq: $tag } } }
    ) {
      nodes {
        title
        id
        cookTime
        prepTime
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
      }
    }
  }
`

export default TagTemplate
