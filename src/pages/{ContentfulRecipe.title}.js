import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { BsPieChart } from "react-icons/bs"
import { GiSandsOfTime } from "react-icons/gi"
import { MdOutlineTimer } from "react-icons/md"
import slugify from "slugify"
import Layout from "../components/Layout"

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
          <GatsbyImage
            image={pathToImage}
            alt={title}
            className="h-96 rounded-lg"
          />
          <article className="">
            <h2>{title}</h2>
            <p className="text-justify">{description}</p>
            <div className="grid grid-cols-3 gap-4 my-8 mx-0 text-center justify-center">
              <article>
                <MdOutlineTimer className="text-2xl mx-auto mb-2" />
                <h5 className="mb-0 text-md font-semibold">Prep Time</h5>
                <p className="mb-0 text-md">{prepTime} min</p>
              </article>
              <article>
                <GiSandsOfTime className="text-2xl mx-auto mb-2" />
                <h5 className="mb-0 text-md font-semibold">Cook Time</h5>
                <p className="mb-0 text-md">{cookTime} min</p>
              </article>
              <article>
                <BsPieChart className="text-2xl mx-auto mb-2" />
                <h5 className="mb-0 text-md font-semibold">Servings</h5>
                <p className="mb-0 text-md">{servings}</p>
              </article>
            </div>
            <p className="flex items-center flex-wrap font-semibold">
              Tags:
              {tags.map((tag, index) => {
                const tagSlug = slugify(tag, { lower: true })
                return (
                  <Link
                    className="bg-indigo-500 rounded-lg text-white py-[.05rem] m-1 px-2 capitalize first:ml-4"
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
        <section className="py-12 px-0 grid gap-y-8 gap-x-20 lg:grid-cols-[2fr_1fr]">
          <article>
            <h4>Instructions</h4>
            {instructions.map((item, index) => {
              return (
                <div key={index}>
                  <header className="grid grid-cols-[auto_1fr] gap-6 items-center">
                    <p className="uppercase font-semibold text-indigo-600 dark:text-indigo-400 mb-0  tracking-wider">
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
                    className="border-b-[1px] border-solid border-gray-500 pb-3 text-indigo-600 dark:text-indigo-400 capitalize"
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
