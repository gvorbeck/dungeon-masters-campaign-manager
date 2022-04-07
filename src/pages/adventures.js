import React from 'react';
import { graphql } from 'gatsby';
import {
  Box, Card, CardHeader, Paper,
} from '@mui/material';
import { CardActionArea } from 'gatsby-theme-material-ui';
import Layout from '../components/Layout/Layout';
import AdventureDetails from '../components/AdventureDetails/AdventureDetails';
import { ADVENTURES } from '../utils/constants';

function AdventuresPage({ data }) {
  return (
    <Layout title={ADVENTURES}>
      <Adventures content={data.allMdx.edges} />
    </Layout>
  );
}

function Adventures({ content }) {
  return (
    <Box>
      <Paper
        sx={{
          px: 2,
          py: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {content.map((adventure) => (
          <Adventure key={adventure.node.id} content={adventure} />
        ))}
      </Paper>
    </Box>
  );
}

function Adventure({ content }) {
  return (
    <Card
      raised
      component="article"
      sx={{
        flex: '0 0 calc(50% - 8px)',
      }}
    >
      <CardActionArea
        to={content.node.fields.slug}
        sx={{
          height: '100%',
        }}
      >
        <CardHeader
          title={content.node.frontmatter.title}
          sx={{
            color: 'white',
            backgroundColor: 'primary.main',
          }}
        />
        <AdventureDetails
          body={content.node.body}
          levels={content.node.frontmatter.levels}
          players={content.node.frontmatter.playernum}
          setting={content.node.frontmatter.setting}
        />
      </CardActionArea>
    </Card>
  );
}

export const query = graphql`
  query AdventuresListPageQuery {
    allMdx(
      filter: {slug: {regex: "/adventures/.+/$/"}}
      sort: {fields: frontmatter___title}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            setting
            levels
            playernum
          }
          fields {
            slug
          }
          body
        }
      }
    }
  }
`;

export default AdventuresPage;

// import React from 'react';
// import { graphql } from 'gatsby';
// import {
//   Box, List, ListItem, Paper, Typography,
// } from '@mui/material';
// import { Link } from 'gatsby-theme-material-ui';
// import Layout from '../components/Layout/Layout';
// import AdventureDetails from '../components/AdventureDetails/AdventureDetails';
// import { ADVENTURES } from '../utils/constants';

// function AdventureList({ adventures }) {
//   return (
//     <List
//       sx={{
//         display: 'grid',
//         gridTemplate: 'auto / repeat(2, 1fr)',
//         columnGap: 2,
//         rowGap: 4,
//         justifyItems: 'stretch',
//       }}
//     >
//       {adventures.map((adventure) => (
//         <AdventureListItem
//           key={adventure.node.frontmatter.title}
//           adventure={adventure.node}
//         />
//       ))}
//     </List>
//   );
// }

// function AdventureListItem({ adventure }) {
//   return (
//     <ListItem
//       sx={{
//         padding: '0',
//         display: 'block',
//       }}
//     >
//       <Box
//         component="article"
//         sx={{
//           typography: 'body1',
//           height: '100%',
//         }}
//       >
//         <Paper
//           elevation={5}
//           sx={{
//             height: '100%',
//             overflow: 'hidden',
//           }}
//         >
//           <Box
//             component="header"
//             sx={{
//               backgroundColor: 'primary.main',
//               padding: 1,
//             }}
//           >
//             <Typography variant="h3" component="h1">
//               <Link
//                 to={adventure.fields.slug}
//                 sx={{
//                   color: 'secondary.light',
//                 }}
//               >
//                 {adventure.frontmatter.title}
//               </Link>
//             </Typography>
//           </Box>
//           <AdventureDetails
//             body={adventure.body}
//             levels={adventure.frontmatter.levels}
//             players={adventure.frontmatter.playernum}
//             setting={adventure.frontmatter.setting}
//           />
//         </Paper>
//       </Box>
//     </ListItem>
//   );
// }

// function AdventuresPage({ data }) {
//   return (
//     <Layout title={ADVENTURES}>
//       <AdventureList adventures={data.allMdx.edges} />
//     </Layout>
//   );
// }

// export default AdventuresPage;
