import React from 'react'
import Link from 'next/link'
import setupTags from '../utils/setupTags'
import slugify from 'slugify'
import { Recipe } from '../lib/types'

interface TagsListProps {
  recipes: Recipe[]
}

const TagsList: React.FC<TagsListProps> = ({ recipes }) => {
  const newTags = setupTags(recipes)

  return (
    <aside className="order-1 mb-4 flex flex-col lg:order-0">
      <h4 className="mb-2 text-center font-bold lg:text-left">Tags</h4>
      <div className="grid grid-cols-[1fr_1fr] text-center lg:grid-cols-1 lg:text-left">
        {newTags.map((tag, index) => {
          const [text, value] = tag
          const tagSlug = slugify(text, { lower: true })
          return (
            <Link
              className="block capitalize transition-all duration-300 ease-in-out hover:text-indigo-500"
              href={`/tags/${tagSlug}`}
              key={index}
            >
              {text} ({value})
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export default TagsList
