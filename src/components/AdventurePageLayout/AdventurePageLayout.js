import React from 'react';
import { graphql } from 'gatsby';
import {
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { Link, ListItemButton } from 'gatsby-theme-material-ui';
import { visuallyHidden } from '@mui/utils';
import { Feed, LocationOn, EmojiPeople } from '@mui/icons-material/';
import Layout from '../Layout/Layout';
import AdventureDetails from '../AdventureDetails/AdventureDetails';
import {
  NPCS, HEADER_CELLS, LOCATIONS,
} from '../../utils/constants';

function AdventurePageLayout({ data }) {
  return (
    <Layout title={data.mdx.frontmatter.title}>
      <Box>
        <Paper
          sx={{
            p: 2,
            display: 'grid',
            gridTemplate: 'repeat(2, auto) / repeat(2, 1fr)',
            gap: 2,
            alignItems: 'flex-start',
          }}
        >
          <Card raised>
            <AdventureDetails
              body={data.mdx.body}
              levels={data.mdx.frontmatter.levels}
              players={data.mdx.frontmatter.playernum}
              setting={data.mdx.frontmatter.setting}
              direction="column-reverse"
            />
          </Card>
          <Card raised>
            <Typography
              variant="h4"
              componen="h3"
              sx={{
                px: 1,
              }}
            >
              <LocationOn />
              {LOCATIONS}
            </Typography>
            <Divider />
            <Locations
              content={data.locations.edges}
              parentAdventureSlug={data.mdx.fields.slug}
              parentAdventureTitle={data.mdx.frontmatter.title}
            />
          </Card>
          <Card
            raised
            sx={{
              gridColumn: '1 / 3',
              gridRow: '2 / 3',
            }}
          >
            <Typography
              variant="h4"
              componen="h3"
              sx={{
                px: 1,
              }}
            >
              <EmojiPeople />
              {NPCS}
            </Typography>
            <Divider />
            <Npcs content={data.npcs.edges} />
          </Card>
        </Paper>
      </Box>
    </Layout>
  );
}

function Locations({ content, parentAdventureSlug, parentAdventureTitle }) {
  return (
    <Box>
      <List>
        {content.map((location) => (
          <LocationItem
            content={location.node}
            key={location.node.fields.slug}
            parentAdventureSlug={parentAdventureSlug}
            parentAdventureTitle={parentAdventureTitle}
          />
        ))}
      </List>
    </Box>
  );
}

function LocationItem({ content, parentAdventureSlug, parentAdventureTitle }) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        state={{
          parentAdventureSlug,
          parentAdventureTitle,
        }}
        to={content.fields.slug}
      >
        <ListItemText
          primary={content.frontmatter.title}
          sx={{
            color: 'primary.light',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

function Npcs({ content }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = content.map((row) => row.node.frontmatter);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const descendingComparator = (a, b) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = () => (
    order === 'desc'
      ? (a, b) => descendingComparator(a, b)
      : (a, b) => -descendingComparator(a, b)
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableContainer>
      <Table>
        <NpcTableHead
          headers={HEADER_CELLS}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <NpcTableBody
          page={page}
          order={order}
          orderBy={orderBy}
          emptyRows={emptyRows}
          rows={rows}
          rowsPerPage={rowsPerPage}
          getComparator={getComparator}
        />
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

function NpcTableHead({
  headers,
  order,
  orderBy,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headers.map((cell) => (
          <NpcTableHeadCell
            cell={cell}
            createSortHandler={createSortHandler}
            key={cell.label}
            order={order}
            orderBy={orderBy}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}

function NpcTableHeadCell({
  cell,
  createSortHandler,
  order,
  orderBy,
}) {
  return (
    <TableCell
      key={cell.id}
      align={cell.numeric ? 'right' : 'left'}
      sortDirection={orderBy === cell.id ? order : false}
    >
      <TableSortLabel
        active={orderBy === cell.id}
        direction={orderBy === cell.id ? order : 'asc'}
        onClick={createSortHandler(cell.id)}
      >
        {cell.label}
        {orderBy === cell.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
}

function NpcTableBody({
  page,
  order,
  orderBy,
  emptyRows,
  rows,
  rowsPerPage,
  getComparator,
}) {
  return (
    <TableBody>
      {rows.slice().sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <TableRow
            hover
            key={row.name}
            tabIndex={-1}
          >
            {[
              row.name,
              row.race,
              row.location,
              row.occupation,
              row.age,
              row.stats,
              row.emotion,
              row.motive,
              row.voice,
            ].map((cell) => {
              if (cell === row.stats) {
                return (
                  <TableCell align="left" key={Math.random()}>
                    <Link
                      to="/search/?category=monsters"
                      state={{
                        query: cell,
                      }}
                    >
                      <Feed
                        sx={{
                          color: 'common.white',
                        }}
                      />
                    </Link>
                  </TableCell>
                );
              }
              return (
                <TableCell
                  key={Math.random()}
                  align={cell === row.age ? 'right' : 'left'}
                >
                  {cell}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 75 * emptyRows,
          }}
        >
          <TableCell colSpan={9} />
        </TableRow>
      )}
    </TableBody>
  );
}

export const query = graphql`
  query AdventurePageQuery($id: String, $locations: String, $npcs: String) {
    mdx(id: {eq: $id}) {
      id
      body
      frontmatter {
        title
        levels
        playernum
        setting
      }
      fields {
        slug
      }
    }
    locations: allMdx(
      filter: {fields: {slug: {regex: $locations}}}
      sort: {fields: frontmatter___title}
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    npcs: allMdx(
      filter: {fields: {slug: {regex: $npcs}}}
      sort: {fields: frontmatter___name}
    ) {
      edges {
        node {
          id
          body
          frontmatter {
            name
            race
            location
            occupation
            age
            emotion
            stats
            motive
            voice
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default AdventurePageLayout;

// // Put a giant Paper down. make details, npcs, locations into cards.
// // make into grid with details and locations side by side and then NPCs.
// import React from 'react';
// import {
//   Box,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TableSortLabel,
//   Typography,
// } from '@mui/material';
// import { Link, ListItemButton } from 'gatsby-theme-material-ui';
// // import { useTheme } from '@mui/styles';
// import { visuallyHidden } from '@mui/utils';
// import FeedIcon from '@mui/icons-material/Feed';
// import {
//   NPCS, HEADER_CELLS, LOCATIONS, BLOCK_HEADER_STYLES,
// } from '../../utils/constants';

// // const dmcmTheme = () => useTheme();

// function NpcTable({ npcs, headers }) {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('name');
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const rows = npcs.map((row) => row.node.frontmatter);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const descendingComparator = (a, b) => {
//     if (b[orderBy] < a[orderBy]) {
//       return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//       return 1;
//     }
//     return 0;
//   };

//   const getComparator = () => (
//     order === 'desc'
//       ? (a, b) => descendingComparator(a, b)
//       : (a, b) => -descendingComparator(a, b)
//   );

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   return (
//     <Box>
//       <Paper
//         elevation={5}
//         sx={{
//           overflow: 'hidden',
//         }}
//       >
//         <Typography
//           variant="h3"
//           sx={BLOCK_HEADER_STYLES}
//         >
//           {NPCS}
//           <Divider />
//         </Typography>
//         <TableContainer>
//           <Table>
//             <NpcTableHead
//               headers={headers}
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//             />
//             <NpcTableBody
//               npcs={npcs}
//               page={page}
//               order={order}
//               orderBy={orderBy}
//               emptyRows={emptyRows}
//               rows={rows}
//               rowsPerPage={rowsPerPage}
//               getComparator={getComparator}
//             />
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       </Paper>
//     </Box>
//   );
// }

// function NpcTableHead({
//   headers, onRequestSort, order, orderBy,
// }) {
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };
//   return (
//     <TableHead>
//       <TableRow>
//         {headers.map((cell) => (
//           <TableCell
//             key={cell.id}
//             align={cell.numeric ? 'right' : 'left'}
//             sortDirection={orderBy === cell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === cell.id}
//               direction={orderBy === cell.id ? order : 'asc'}
//               onClick={createSortHandler(cell.id)}
//             >
//               {cell.label}
//               {orderBy === cell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// function NpcTableBody({
//   emptyRows, getComparator, order, orderBy, page, rows, rowsPerPage,
// }) {
//   return (
//     <TableBody>
//       {rows.slice().sort(getComparator(order, orderBy))
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//         .map((row) => (
//           <TableRow
//             hover
//             tabIndex={-1}
//             key={row.name}
//           >
//             {[
//               row.name,
//               row.race,
//               row.location,
//               row.occupation,
//               row.age,
//               row.stats,
//               row.emotion,
//               row.motive,
//               row.voice,
//             ].map((cell) => {
//               if (cell === row.stats) {
//                 return (
//                   <TableCell key={Math.random()} align="left">
//                     <Link
//                       to="/search/?category=monsters"
//                       state={{
//                         query: cell,
//                       }}
//                     >
//                       <FeedIcon
//                         sx={{
//                           color: 'common.white',
//                         }}
//                       />
//                     </Link>
//                   </TableCell>
//                 );
//               }
//               return (
//                 <TableCell
//                   key={Math.random()}
//                   align={cell === row.age ? 'right' : 'left'}
//                 >
//                   {cell}
//                 </TableCell>
//               );
//             })}
//           </TableRow>
//         ))}
//       {emptyRows > 0 && (
//         <TableRow
//           style={{
//             height: 75 * emptyRows,
//           }}
//         >
//           <TableCell colSpan={9} />
//         </TableRow>
//       )}
//     </TableBody>
//   );
// }

// function Locations({ locations, parentAdventureSlug, parentAdventureTitle }) {
//   return (
//     <Box>
//       <Paper
//         sx={{
//           overflow: 'hidden',
//         }}
//       >
//         <Typography
//           variant="h3"
//           sx={BLOCK_HEADER_STYLES}
//         >
//           {LOCATIONS}
//         </Typography>
//         <Divider />
//         <List
//           sx={{
//             padding: 0,
//           }}
//         >
//           {locations.map((location) => (
//             <ListItem disablePadding key={location.node.frontmatter.title}>
//               <Link
//                 component={ListItemButton}
//                 underline="none"
//                 to={location.node.fields.slug}
//                 state={{
//                   parentAdventureSlug,
//                   parentAdventureTitle,
//                 }}
//                 sx={{
//                   color: 'primary.light',
//                 }}
//               >
//                 <ListItemText primary={location.node.frontmatter.title} />
//               </Link>
//             </ListItem>
//           ))}
//         </List>
//       </Paper>
//     </Box>
//   );
// }

// function AdventurePageLayout({ data }) {
//   return (
//     <Layout title={data.mdx.frontmatter.title}>
//       <Stack
//         sx={{
//           rowGap: 2,
//           paddingTop: 1,
//           paddingBottom: 1,
//         }}
//       >
//         <Paper
//           elevation={5}
//           sx={{
//             overflow: 'hidden',
//           }}
//         >
//           <AdventureDetails
//             body={data.mdx.body}
//             levels={data.mdx.frontmatter.levels}
//             players={data.mdx.frontmatter.playernum}
//             setting={data.mdx.frontmatter.setting}
//             direction="column-reverse"
//           />
//         </Paper>
//         <NpcTable
//           npcs={data.npcs.edges}
//           headers={HEADER_CELLS}
//         />
//         <Locations
//           locations={data.locations.edges}
//           parentAdventureSlug={data.mdx.fields.slug}
//           parentAdventureTitle={data.mdx.frontmatter.title}
//         />
//       </Stack>
//     </Layout>
//   );
// }

// export default AdventurePageLayout;
