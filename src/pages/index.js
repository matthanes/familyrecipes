import React from "react"
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import FeaturedRecipes from "../components/FeaturedRecipes"

const Home = () => {
  return (
    <Layout>
      <main className="page">
        <header className="hero">
          <StaticImage
            src="../assets/images/main.jpg"
            alt="flour and cracked eggs"
            className="hero-img"
            placeholder="tracedSVG"
            layout="fullWidth"
          />
          <div className="hero-container">
            <div className="hero-text">
              <h1>Family Recipes</h1>
              <h4>No annoying blog posts or ads</h4>
            </div>
          </div>
        </header>
        <FeaturedRecipes />
      </main>
      
    </Layout>
  )
}

export default Home
