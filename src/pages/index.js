import React from "react"
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import FeaturedRecipes from "../components/FeaturedRecipes"

const Home = () => {
  return (
    <Layout>
        <header className="h-[30vh] md:h-[40vh] relative mb-8">
          <StaticImage
            src="../assets/images/main.jpg"
            alt="flour and cracked eggs"
            className="h-full rounded-xl"
            placeholder="tracedSVG"
            layout="fullWidth"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/70 rounded-xl">
            <div className="text-white text-center">
              <h1 className="text-5xl lg:text-7xl line mb-4">Family Recipes</h1>
              <h2 className="text-2xl">No annoying blog posts or ads</h2>
            </div>
          </div>
        </header>
        <h3 className="lg:ml-[calc(200px+1rem)]">Featured Recipes</h3>
        <FeaturedRecipes />
    </Layout>
  )
}

export default Home
