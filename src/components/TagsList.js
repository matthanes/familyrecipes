import { Link } from 'gatsby'
import React from 'react'
import setupTags from '../utils/setupTags'
import slugify from 'slugify'
import { graphql, useStaticQuery } from 'gatsby'
import flattenTags from '../utils/flattenTags'

const query = graphql`
  {
    allContentfulRecipe(sort: { title: ASC }) {
      nodes {
        content {
          tags
        }
      }
    }
    directus {
      recipes {
        tags {
          tags_id {
            tag_name
          }
        }
      }
    }
  }
`

const TagsList = () => {
  const data = useStaticQuery(query)
  const recipes = data.allContentfulRecipe.nodes
  const directusRecipes = data.directus.recipes
  // restructure directusRecipes to match recipes
  directusRecipes.forEach(recipe => {
    recipe.content = {}
    recipe.content.tags = flattenTags(recipe.tags)
  })
  const newTags = setupTags([...recipes, ...directusRecipes])
  return (
    <div className="order-1 mb-4 flex flex-col lg:order-none">
      <h4 className="mb-2 text-center font-bold lg:text-left">Tags</h4>
      <div className="grid grid-cols-[1fr_1fr] text-center lg:grid-cols-1 lg:text-left">
        {newTags.map((tag, index) => {
          const [text, value] = tag
          const tagSlug = slugify(text, { lower: true })
          return (
            <Link
              className="block capitalize transition-all duration-300 ease-in-out hover:text-indigo-500"
              to={`/tags/${tagSlug}`}
              key={index}
            >
              {text} ({value})
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TagsList
