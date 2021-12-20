import React from "react"

import { graphql, Link } from "gatsby"
import setupTags from "../utils/setupTags"
import slugify from "slugify"

const Tags = ({ data }) => {
  const newTags = setupTags(data.allContentfulRecipe.nodes)
  return (
    <>
      <main>
        <section className="grid gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-3">
          {newTags.map((tag, index) => {
            const [text, value] = tag
            const tagSlug = slugify(text, { lower: true })
            return (
              <Link
                to={`/tags/${tagSlug}`}
                key={index}
                className="bg-zinc-700 rounded-lg text-center text-white transition-all ease-in-out duration-300 py-3 px-0 hover:bg-indigo-500"
              >
                <h5 className="mb-0 font-semibold">{text}</h5>
                <p className="mb-0">{value} recipes</p>
              </Link>
            )
          })}
        </section>
      </main>
    </>
  )
}

export const query = graphql`
  {
    allContentfulRecipe {
      nodes {
        content {
          tags
        }
      }
    }
  }
`

export default Tags
