import { Link } from "gatsby"
import React from "react"
import setupTags from "../utils/setupTags"
import slugify from "slugify"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
  {
    allContentfulRecipe(sort: { order: ASC, fields: title }) {
      nodes {
        id
        prepTime
        cookTime
        title
        content {
          tags
        }
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
      }
    }
  }
`

const TagsList = () => {
  const data = useStaticQuery(query)
  const recipes = data.allContentfulRecipe.nodes
  //   console.log(recipes)
  const newTags = setupTags(recipes)
  return (
    <div className="tag-container">
      <h4>Recipes</h4>
      <div className="tags-list">
        {newTags.map((tag, index) => {
          const [text, value] = tag
          const tagSlug = slugify(text, { lower: true })
          return (
            <Link to={`/tags/${tagSlug}`} key={index}>
              {text} ({value})
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TagsList
