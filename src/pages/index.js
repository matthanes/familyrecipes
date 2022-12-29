import React from 'react'
import Layout from '../components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import FeaturedRecipes from '../components/FeaturedRecipes'

const Home = () => {
  return (
    <Layout>
      <header className="relative mb-8 h-[30vh] md:h-[40vh]">
        <StaticImage
          src="../assets/images/main.jpg"
          alt="flour and cracked eggs"
          className="h-full rounded-xl"
          placeholder="blurred"
          layout="fullWidth"
        />
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-xl bg-black/70">
          <div className="text-center text-white">
            <h1 className="line mb-4 text-5xl lg:text-7xl">Family Recipes</h1>
            <h2 className="text-2xl">No annoying blog posts or ads</h2>
          </div>
        </div>
      </header>
      <FeaturedRecipes />
    </Layout>
  )
}

export default Home
