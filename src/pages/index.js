import React from "react"
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import FeaturedRecipes from "../components/FeaturedRecipes"

const Home = () => {
  return (
    <Layout>
      <main className="min-h-[calc(100vh-10rem)] w-[90vw] max-w-7xl my-0 mx-auto">
        <header className="hero h-[40vh] relative mb-8">
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
              <h4 className="text-2xl">No annoying blog posts or ads</h4>
            </div>
          </div>
        </header>
        <FeaturedRecipes />
      </main>
      
    </Layout>
  )
}

export default Home
