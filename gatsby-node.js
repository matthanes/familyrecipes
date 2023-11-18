const path = require('path')
const slugify = require('slugify')
const flattenTags = require('./src/utils/flattenTags')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query getRecipes {
      allContentfulRecipe {
        nodes {
          content {
            tags
          }
        }
      }
    }
  `)

  const directusRecipes = await graphql(`
    query getDirectusRecipes {
      directus {
        recipes {
          title
          tags {
            tags_id {
              tag_name
            }
          }
        }
      }
    }
  `)

  directusRecipes.data.directus.recipes.forEach(recipe => {
    createPage({
      path: `${slugify(recipe.title, { lower: true })}`,
      component: path.resolve(`src/templates/recipe-template.js`),
      context: {
        title: recipe.title,
      },
    })
  })

  directusRecipes.data.directus.recipes.forEach(recipe => {
    recipe.content = {}
    recipe.content.tags = flattenTags(recipe.tags)
  })

  const allRecipes = [
    ...directusRecipes.data.directus.recipes,
    ...result.data.allContentfulRecipe.nodes,
  ]

  allRecipes.forEach(recipe => {
    recipe.content.tags.forEach(tag => {
      const tagSlug = slugify(tag, { lower: true })
      createPage({
        path: `/tags/${tagSlug}`,
        component: path.resolve(`src/templates/tag-template.js`),
        context: {
          tag: tag,
        },
      })
    })
  })

  directusRecipes.data.directus.recipes.forEach(recipe => {
    createPage({
      path: `${slugify(recipe.title, { lower: true })}`,
      component: path.resolve(`src/templates/recipe-template.js`),
      context: {
        title: recipe.title,
      },
    })
  })
}
