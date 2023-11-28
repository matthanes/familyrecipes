import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { BsPieChart } from 'react-icons/bs'
import { GiSandsOfTime } from 'react-icons/gi'
import { MdOutlineTimer } from 'react-icons/md'
import slugify from 'slugify'
import Layout from '../components/Layout'
import minutesToHours from '../utils/minutesToHours'

const RecipeTemplate = ({ data }) => {
  const {
    title,
    cookTime,
    content,
    prepTime,
    servings,
    description: { description },
    image,
  } = data.contentfulRecipe
  const pathToImage = getImage(image)
  const { tags, instructions, ingredients, tools } = content

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
        <article className="">
          <h2>{title}</h2>
          <p className="text-justify">{description}</p>
          <div className="my-8 mx-0 grid grid-cols-3 justify-center gap-4 text-center">
            <article>
              <MdOutlineTimer className="mx-auto mb-2 text-2xl" />
              <h5 className="text-md mb-0 font-semibold">Prep Time</h5>
              <p className="text-md mb-0">{minutesToHours(prepTime)}</p>
            </article>
            <article>
              <GiSandsOfTime className="mx-auto mb-2 text-2xl" />
              <h5 className="text-md mb-0 font-semibold">Cook Time</h5>
              <p className="text-md mb-0">{minutesToHours(cookTime)}</p>
            </article>
            <article>
              <BsPieChart className="mx-auto mb-2 text-2xl" />
              <h5 className="text-md mb-0 font-semibold">Servings</h5>
              <p className="text-md mb-0">{servings}</p>
            </article>
          </div>
          <p className="flex flex-wrap items-center font-semibold">
            Tags:
            {tags.map((tag, index) => {
              const tagSlug = slugify(tag, { lower: true })
              return (
                <Link
                  className="m-1 rounded-lg bg-indigo-500 py-[.05rem] px-2 capitalize text-white first:ml-4"
                  to={`/tags/${tagSlug}`}
                  key={index}
                >
                  {tag}
                </Link>
              )
            })}
          </p>
        </article>
      </section>
      <section className="grid gap-y-8 gap-x-20 py-12 px-0 lg:grid-cols-[2fr_1fr]">
        <article>
          <h4>Instructions</h4>
          {instructions.map((item, index) => {
            return (
              <div key={index}>
                <header className="grid grid-cols-[auto_1fr] items-center gap-6">
                  <p className="mb-0 font-semibold uppercase tracking-wider text-indigo-600  dark:text-indigo-400">
                    Step {index + 1}
                  </p>
                  <div className="h-[1px] bg-gray-500"></div>
                </header>
                <p>{item}</p>
              </div>
            )
          })}
        </article>
        <article className="grid gap-y-8">
          <div>
            <h4>Ingredients</h4>
            {ingredients.map((item, index) => {
              return (
                <p
                  key={index}
                  className="border-b-[1px] border-solid border-gray-500 pb-3"
                >
                  {item}
                </p>
              )
            })}
          </div>
          <div>
            <h4>Tools</h4>
            {tools.map((item, index) => {
              return (
                <p
                  key={index}
                  className="border-b-[1px] border-solid border-gray-500 pb-3 capitalize text-indigo-600 dark:text-indigo-400"
                >
                  {item}
                </p>
              )
            })}
          </div>
        </article>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query getSingleRecipe($title: String) {
    contentfulRecipe(title: { eq: $title }) {
      title
      cookTime
      prepTime
      servings
      image {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
      }
      content {
        ingredients
        instructions
        tags
        tools
      }
      description {
        description
      }
    }
  }
`

export default RecipeTemplate
