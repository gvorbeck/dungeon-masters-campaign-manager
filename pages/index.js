import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Navigation from '../components/Navigation/Navigation';
import Layout from '../components/Layout/Layout';
import { GREETING, DESCRIPTION } from '../utils/constants';

function IndexPage() {
  return (
    <Layout title="Home" hideNavigation>
      <Box>
        <Paper
          sx={{
            color: 'secondary.main',
            display: 'grid',
            padding: '0.5rem',
            gridTemplate: 'repeat(3, auto) / repeat(2, auto)',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              gridColumn: '1 / 2',
              gridRow: '1 / 2',
            }}
          >
            {GREETING}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              borderTop: '1px solid',
              paddingTop: '1rem',
              gridColumn: '1 / 2',
              gridRow: '3 / 4',
            }}
          >
            {DESCRIPTION}
          </Typography>
          <Navigation
            homeNav
            size="large"
            navDirection="column"
            sx={{
              gridRow: '1 / 4',
            }}
          />
        </Paper>
      </Box>
    </Layout>
  );
}

export default IndexPage;
