require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

var slugify = require('slugify')

module.exports = {
  trailingSlash: `always`, // this is the default, but I'm including it here for clarity
  pathPrefix: `/recipes`,
  siteMetadata: {
    title: 'Family Recipes',
    description:
      'A collection of family recipes without the annoying blog posts and ads',
    author: 'Matt Hanes',
    siteUrl: 'https://matthanesprojects.com/recipes',
  },

  plugins: [
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            title: 'Family Recipes',
            output: 'rss.xml',
            query: `
            {
              allContentfulRecipe(sort: {title: ASC}) {
                nodes {
                  id
                  prepTime
                  cookTime
                  title
                  content {
                    tags
                  }
                  image {
                    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
                  }
                }
              }
            }
          `,
            serialize: ({ query: { site, allContentfulRecipe } }) => {
              return allContentfulRecipe.nodes.map(node => {
                return Object.assign({}, node, {
                  url: `${site.siteMetadata.siteUrl}/${slugify(node.title, {
                    lower: true,
                  })}`,
                  guid: `${site.siteMetadata.siteUrl}/${slugify(node.title, {
                    lower: true,
                  })}`,
                })
              })
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google2: [
            {
              family: 'Inconsolata',
              axes: 'wght@400..700',
            },
            {
              family: 'Montserrat',
              axes: 'wght@400',
            },
          ],
        },
      },
    },

    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Family Recipes`,
        short_name: `Family Recipes`,
        start_url: `/`,
        background_color: `#27272a`,
        theme_color:`#645cff`,
        display: `standalone`,
        icon: `src/assets/images/logodark.svg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-no-index`,
  ],
}
