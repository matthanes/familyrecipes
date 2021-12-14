import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import slugify from "slugify"

const RecipesList = ({ recipes = [] }) => {
  return (
    <div className="recipes-list grid gap-y-8 gap-x-4 pb-12 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr]">
      {recipes.map(recipe => {
        const { id, title, image, prepTime, cookTime } = recipe
        const pathToImage = getImage(image)
        const slug = slugify(title, { lower: true })

        return (
          <Link to={`/${slug}`} className="recipe block" key={id}>
            <GatsbyImage
              image={pathToImage}
              className="recipe-img h-60 rounded-lg sm:h-40 lg:h-36"
              alt={title}
            />
            <h5 className="mb-0 mt-1 leading-none text-slate-100 font-semibold xl:text-xl">{title}</h5>
            <p className="mb-0 mt-2 leading-none text-zinc-700 text-sm">
              Prep : {prepTime} min | Cook Time : {cookTime} min
            </p>
          </Link>
        )
      })}
    </div>
  )
}

export default RecipesList
