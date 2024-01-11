import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { BsPieChart } from 'react-icons/bs'
import { GiSandsOfTime } from 'react-icons/gi'
import { MdOutlineTimer } from 'react-icons/md'
import slugify from 'slugify'
import Layout from '../components/Layout'
import RecipeMultiplier from '../components/RecipeMultiplier'
import flattenTags from '../utils/flattenTags'
import decimalToFraction from '../utils/decimalToFraction'
import minutesToHours from '../utils/minutesToHours'

const RecipeTemplate = ({ data }) => {
  const {
    directus: { recipes },
  } = data
  let {
    title,
    cook_time: cookTime,
    description,
    prep_time: prepTime,
    servings,
    image,
    ingredients,
    instructions,
    tags,
    tools,
  } = recipes[0]

  const [updatedIngredients, setIngredients] = useState(ingredients)
  const [multiplier, setMultiplier] = useState(1)

  // extract image
  const pathToImage = getImage(image.imageFile)

  // flatten tags
  tags = flattenTags(tags)

  const substituteIngredient = step => {
    // Find instances of {{1}}, {{2}}, etc...
    const regex = /{{\d+}}/g
    const matches = step.match(regex)
    if (matches) {
      matches.forEach(match => {
        // ingredientIndex is the number within the match and subtract for zero indexing
        const ingredientIndex = match.match(/\d+/)[0] - 1
        const { amount, measurement, ingredient } =
          ingredients[ingredientIndex] || {}
        const replacementPhrase = [
          amount && decimalToFraction(amount * multiplier),
          measurement,
          ingredient,
        ]
          .filter(Boolean)
          .join(' ')
        step = step.replace(match, replacementPhrase)
      })
    }
    return step
  }

  useEffect(() => {
    const updatedIngredients = ingredients.map(item => {
      const updatedAmount = item.amount * multiplier
      return {
        ...item,
        amount: updatedAmount,
      }
    })
    setIngredients(updatedIngredients)
  }, [multiplier, ingredients])

  return (
    <Layout>
      <section className="grid gap-12 lg:grid-cols-[4fr_5fr] lg:items-center">
        {pathToImage && (
          <GatsbyImage
            image={pathToImage}
            alt={title}
            className="h-96 rounded-lg"
          />
        )}
        <div className="">
          <h2>{title}</h2>
          <p className="text-justify">{description}</p>
          <div className="mx-0 my-8 grid grid-cols-3 justify-center gap-4 text-center">
            <div>
              <MdOutlineTimer className="mx-auto mb-2 text-2xl" />
              <h5 className="text-md mb-0 font-semibold">Prep Time</h5>
              <p className="text-md mb-0">{minutesToHours(prepTime)}</p>
            </div>
            <div>
              <GiSandsOfTime className="mx-auto mb-2 text-2xl" />
              <h5 className="text-md mb-0 font-semibold">Cook Time</h5>
              <p className="text-md mb-0">{minutesToHours(cookTime)}</p>
            </div>
            <div>
              <BsPieChart className="mx-auto mb-2 text-2xl" />
              <h5 className="text-md mb-0 font-semibold">Servings</h5>
              <p className="text-md mb-0">{servings * multiplier}</p>
            </div>
          </div>
          <p className="flex flex-wrap items-center font-semibold">
            Tags:
            {tags.map((tag, index) => {
              const tagSlug = slugify(tag, { lower: true })
              return (
                <Link
                  className="m-1 rounded-lg bg-indigo-500 px-2 py-[.05rem] capitalize text-white first:ml-4"
                  to={`/tags/${tagSlug}`}
                  key={index}
                >
                  {tag}
                </Link>
              )
            })}
          </p>
        </div>
      </section>
      <section className="grid gap-x-20 gap-y-8 px-0 py-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <h4>Instructions</h4>
          {instructions &&
            instructions.map((item, index) => {
              return (
                <div key={index}>
                  <header className="grid grid-cols-[auto_1fr] items-center gap-6">
                    <p className="mb-0 font-semibold uppercase tracking-wider text-indigo-600  dark:text-indigo-400">
                      Step {index + 1}
                    </p>
                    <div className="h-[1px] bg-gray-500"></div>
                  </header>
                  <p>{substituteIngredient(item.step)}</p>
                </div>
              )
            })}
        </div>
        <div className="grid gap-y-8">
          <div>
            <h4>Ingredients</h4>
            <label
              htmlFor="quantity-input"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Increase Recipe:
            </label>
            <RecipeMultiplier
              multiplier={multiplier}
              setMultiplier={setMultiplier}
            />
            {updatedIngredients &&
              updatedIngredients.map((item, index) => {
                const { amount = '', measurement = '', ingredient = '' } = item
                return (
                  <p
                    key={index}
                    className="border-b-[1px] border-solid border-gray-500 pb-3"
                  >
                    {`${
                      isNaN(amount) ? '' : decimalToFraction(amount)
                    } ${measurement} ${ingredient}`}
                  </p>
                )
              })}
          </div>
          <div>
            <h4>Tools</h4>
            {tools &&
              tools.map((item, index) => {
                return (
                  <p
                    key={index}
                    className="border-b-[1px] border-solid border-gray-500 pb-3 capitalize text-indigo-600 dark:text-indigo-400"
                  >
                    {item.tool}
                  </p>
                )
              })}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query getSingleRecipe($title: String) {
    directus {
      recipes(filter: { title: { _eq: $title } }) {
        title
        cook_time
        description
        featured
        id
        ingredients
        instructions
        prep_time
        servings
        status
        tools
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

export default RecipeTemplate
