import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import slugify from 'slugify'

const RecipesList = ({ recipes = [] }) => {
  return (
    <div className="recipes-list grid gap-x-4 gap-y-8 pb-12 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr]">
      {recipes.length > 0 ? (
        recipes.map(recipe => {
          const { id, title, image, prepTime, cookTime } = recipe
          const pathToImage = getImage(image?.imageFile ?? image)
          const slug = slugify(title, { lower: true })

          return (
            <Link to={`/${slug}`} className="block" key={id}>
              {pathToImage && (
                <GatsbyImage
                  image={pathToImage}
                  className="h-60 rounded-lg"
                  alt={title}
                />
              )}
              <h5 className="mb-0 mt-1 font-semibold leading-none text-zinc-700 dark:text-slate-200 xl:text-xl">
                {title}
              </h5>
              <p className="mb-0 mt-2 leading-none text-zinc-700 dark:text-slate-200">
                Prep : {prepTime ?? recipe.prep_time} min | Cook Time : {cookTime ?? recipe.cook_time} min
              </p>
            </Link>
          )
        })
      ) : (
        <h4 className="col-span-4 text-zinc-700 dark:text-slate-200">
          No recipes matching that search.
        </h4>
      )}
    </div>
  )
}

export default RecipesList
