import React from 'react';
import { Box, List, Stack } from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import { NAVIGATION_DATA } from '../../utils/constants';

function Navigation({
  homeNav, hideNavigation, navDirection, variant, size,
}) {
  return (
    <Box
      component="nav"
      sx={{
        display: hideNavigation && 'none',
      }}
    >
      <Stack
        component={List}
        direction={navDirection || 'row'}
        sx={{
          py: 2,
          justifyContent: 'flex-end',
        }}
      >
        {NAVIGATION_DATA.map((item) => (
          <Button
            size={size || 'medium'}
            variant={variant || 'contained'}
            key={item.title}
            to={item.slug}
            color={homeNav ? 'primary' : 'secondary'}
            sx={{
              '& + &': {
                marginTop: homeNav ? 2 : 0,
                marginLeft: homeNav ? 0 : 2,
              },
            }}
          >
            {item.title}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}

export default Navigation;
