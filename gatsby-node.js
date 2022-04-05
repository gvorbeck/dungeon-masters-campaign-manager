/*
** GENERATE SLUGS
*/
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // Only operate on `Mdx` nodes. If content is coming from a remote CMS, you can also check
  // to see if the parent node is a `File` node here.
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

/*
** PAGE TEMPLATES
*/
const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const basePath = "/";
  actions.createPage({
    path: basePath,
    component: require.resolve("./pages/index.js"),
  });

  const adventurePath = "/adventures/";
  actions.createPage({
    path: adventurePath,
    component: require.resolve("./pages/adventures.js"),
  });

  const searchPath = "/search";
  actions.createPage({
    path: searchPath,
    component: require.resolve("./pages/search.js"),
  });

  const referencePath = "/reference";
  actions.createPage({
    path: referencePath,
    component: require.resolve("./pages/reference.js"),
  });

  const result = await graphql(`
    query {
      adventures: allMdx(filter: {fields: {slug: {regex: "/adventures\\\\/\\\\w+\\\\/$/i"}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
      locations: allMdx(filter: {fields: {slug: {regex: "/locations/"}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const adventures = result.data.adventures.edges;
  adventures.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: require.resolve('./components/AdventurePageLayout/AdventurePageLayout.js'),
      context: {
        id: node.id,
        locations: `${node.fields.slug}locations/`,
        npcs: `${node.fields.slug}npcs/`,
      },
    });
  });

  const locations = result.data.locations.edges;
  locations.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: require.resolve('./components/LocationPageLayout/LocationPageLayout.js'),
      context: {
        id: node.id,
      },
    });
  });
};
