import React from "react"
import TagsList from "./TagsList"
import RecipesList from "./RecipesList"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
{
  allContentfulRecipe(
    filter: { featured: { eq: true } }
    sort: { fields: title, order: ASC }
  ) {
    nodes {
      id
      title
      cookTime
      prepTime
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

  return (
    <section className="recipes-container">
      <TagsList />
      <RecipesList recipes={recipes} />
    </section>
  )
}

export default FeaturedRecipes
