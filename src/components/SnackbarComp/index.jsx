// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';

import Box from 'components/Box';
import Typography from 'components/Typography';

// Custom styles for the MKSnackbar
import MKSnackbarIconRoot from 'components/SnackbarComp/MKSnackbarIconRoot';

function SnackbarComp({ color, icon, title, dateTime, content, close, bgWhite, ...rest }) {
  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = 'dark';
    dividerColor = false;
  } else if (color === 'light') {
    titleColor = 'dark';
    dateTimeColor = 'text';
    dividerColor = false;
  } else {
    titleColor = 'white';
    dateTimeColor = 'white';
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      {...rest}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <Box
        variant={bgWhite ? 'contained' : 'gradient'}
        bgColor={bgWhite ? 'white' : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
        sx={{
          backgroundColor: ({ palette }) => palette[color] || palette.white.main,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" color="dark" p={1.5}>
          <Box display="flex" alignItems="center" lineHeight={0}>
            <MKSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
              {icon}
            </MKSnackbarIconRoot>
            <Typography variant="button" fontWeight="medium" color={titleColor} textGradient={bgWhite}>
              {title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" lineHeight={0}>
            <Typography variant="caption" color={dateTimeColor}>
              {dateTime}
            </Typography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }) => (bgWhite || color === 'light' ? dark.main : white.main),
                fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
                cursor: 'pointer',
                marginLeft: 2,
                transform: 'translateY(-1px)',
              }}
              onClick={close}
            >
              close
            </Icon>
          </Box>
        </Box>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <Box
          p={1.5}
          sx={{
            fontSize: ({ typography: { size } }) => size.sm,
            color: ({ palette: { white, text } }) => (bgWhite || color === 'light' ? text.main : white.main),
          }}
        >
          {content}
        </Box>
      </Box>
    </Snackbar>
  );
}

// Setting default values for the props of SnackbarComp
SnackbarComp.defaultProps = {
  bgWhite: false,
  color: 'info',
};

// Typechecking props for SnackbarComp
SnackbarComp.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark', 'light']),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  bgWhite: PropTypes.bool,
};

export default SnackbarComp;
