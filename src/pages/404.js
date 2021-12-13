import React from "react"
import Layout from "../components/Layout"

const Error = () => {
  return (
    <Layout>
      <main className="min-h-[calc(100vh-10rem)] text-center pt-12">
        <section>
          <h1 className="text-9xl">404</h1>
          <h3>Page not found.</h3>
        </section>
      </main>
    </Layout>
  )
}

export default Error
