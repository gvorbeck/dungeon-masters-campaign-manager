module.exports = {
  siteMetadata: {
    title: 'Dungeon Master\'s Campaign Manager',
    siteUrl: 'https://example.com',
  },
  plugins: [
    'gatsby-plugin-image', 'gatsby-plugin-react-helmet', 'gatsby-plugin-mdx',
    'gatsby-plugin-sharp', 'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/images/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/pages/`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
  ],
};
