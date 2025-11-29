import React from 'react'
import Link from 'next/link'
import { getAllRecipes } from '../../lib/utils'
import setupTags from '../../utils/setupTags'
import slugify from 'slugify'

export default async function TagsPage() {
  const recipes = await getAllRecipes()
  const newTags = setupTags(recipes)

  return (
    <div className="px-4 py-8 lg:px-8">
      <section className="grid gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {newTags.map((tag, index) => {
          const [text, value] = tag
          const tagSlug = slugify(text, { lower: true })
          return (
            <Link
              href={`/tags/${tagSlug}`}
              key={index}
              className="rounded-lg bg-zinc-700 px-0 py-3 text-center text-white transition-all duration-300 ease-in-out hover:bg-indigo-500"
            >
              <h5 className="mb-0 font-semibold">{text}</h5>
              <p className="mb-0">{value} recipes</p>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
