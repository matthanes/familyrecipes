import React from 'react'
import Image from 'next/image'
import FeaturedRecipes from '../components/FeaturedRecipes'
import { getAllRecipes } from '../lib/utils'
import mainImage from '../assets/images/main.jpg'

export default async function Home() {
  const recipes = await getAllRecipes()

  return (
    <div className="px-4 py-8 lg:px-8">
      <header className="relative mb-4 h-[30vh] md:h-[40vh] lg:mb-8">
        <Image
          src={mainImage}
          alt="Dinner table with plates of food"
          fill
          className="rounded-xl object-cover"
          priority
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-xl bg-black/70">
          <div className="text-center text-white">
            <h1 className="line mb-4 text-5xl lg:text-7xl">Family Recipes</h1>
            <h2 className="text-2xl">No annoying blog posts or ads</h2>
          </div>
        </div>
      </header>
      <FeaturedRecipes recipes={recipes} />
    </div>
  )
}
