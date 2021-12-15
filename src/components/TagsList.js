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
    <div className="order-1 mb-4 lg:order-none flex flex-col">
      <h4 className="mb-2 font-bold text-center lg:text-left">Tags</h4>
      <div className="grid grid-cols-[1fr_1fr_1fr] text-center lg:text-left lg:grid-cols-1">
        {newTags.map((tag, index) => {
          const [text, value] = tag
          const tagSlug = slugify(text, { lower: true })
          return (
            <Link className="capitalize block transition-all ease-in-out duration-300 hover:text-indigo-700" to={`/tags/${tagSlug}`} key={index}>
              {text} ({value})
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TagsList
