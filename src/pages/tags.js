import React from 'react'
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby'
import setupTags from '../utils/setupTags'
import flattenTags from '../utils/flattenTags'
import slugify from 'slugify'

const DEV = process.env.NODE_ENV === 'development'

const Tags = ({ data }) => {
  const recipes = data.allContentfulRecipe.nodes
  let directusRecipes = data.directus.recipes

  directusRecipes = directusRecipes.reduce((filteredRecipes, recipe) => {
    recipe.content = {}
    recipe.content.tags = flattenTags(recipe.tags)

    if (DEV || recipe.status === 'published') {
      filteredRecipes.push(recipe)
    }

    return filteredRecipes
  }, [])

  const allRecipes = [...directusRecipes, ...recipes]
  const newTags = setupTags(allRecipes)
  return (
    <Layout>
      <section className="grid gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {newTags.map((tag, index) => {
          const [text, value] = tag
          const tagSlug = slugify(text, { lower: true })
          return (
            <Link
              to={`/tags/${tagSlug}`}
              key={index}
              className="rounded-lg bg-zinc-700 px-0 py-3 text-center text-white transition-all duration-300 ease-in-out hover:bg-indigo-500"
            >
              <h5 className="mb-0 font-semibold">{text}</h5>
              <p className="mb-0">{value} recipes</p>
            </Link>
          )
        })}
      </section>
    </Layout>
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
    directus {
      recipes {
        status
        tags {
          tags_id {
            tag_name
          }
        }
      }
    }
  }
`

export default Tags
