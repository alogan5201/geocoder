// react-router-dom components
import { Link } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Box from 'components/Box';
import Typography from 'components/Typography';

function DefaultFooter({ content }) {
  const { brand,  menus, copyright } = content;

  return (
    <Box component="footer">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} sx={{ ml: 'auto', mb: 3 }}>
            <Box>
              <Typography variant="h6">{brand.name}</Typography>
            </Box>
          </Grid>
          {menus.map(({ name: title, items }) => (
            <Grid key={title} item xs={6} md={2} sx={{ mb: 3 }}>
              <Typography display="block" variant="button" fontWeight="bold" textTransform="capitalize" mb={1}>
                {title}
              </Typography>
              <Box component="ul" p={0} m={0} sx={{ listStyle: 'none' }}>
                {items.map(({ name, route, href }) => (
                  <Box key={name} component="li" p={0} m={0} lineHeight={1.25}>
                    {href ? (
                      <Typography
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        variant="button"
                        fontWeight="regular"
                        textTransform="capitalize"
                      >
                        {name}
                      </Typography>
                    ) : (
                      <Typography
                        component={Link}
                        to={route}
                        variant="button"
                        fontWeight="regular"
                        textTransform="capitalize"
                      >
                        {name}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sx={{ textAlign: 'center', my: 3 }}>
            {copyright}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Typechecking props for the DefaultFooter
DefaultFooter.propTypes = {
  content: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])).isRequired,
};

export default DefaultFooter;
