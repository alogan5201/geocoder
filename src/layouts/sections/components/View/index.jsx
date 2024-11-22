

import { useState, useEffect } from 'react';

// prop-types is a library for type checking of props
import PropTypes from 'prop-types';

// react-copy-to-clipboard components
import { CopyToClipboard } from 'react-copy-to-clipboard';

// react-syntax-highlighter components
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Slide from '@mui/material/Slide';

import Box from 'components/Box';
import Alert from 'components/Alert';
import Button from 'components/Button';
import Typography from 'components/Typography';

import colors from 'assets/theme/base/colors';

function View({ children, code, title, height, ...rest }) {
  const { grey } = colors;

  const [activeTab, setActiveTab] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleTabType = (event, newValue) => setActiveTab(newValue);

  useEffect(() => {
    setTimeout(() => setSuccess(false), 3000);
  }, [success]);

  return (
    <Box width="100%" position="relative" borderRadius="xl" shadow="lg" mb={12} sx={{ overflow: 'hidden' }} {...rest}>
      <Box
        px={3}
        sx={{
          borderBottom: ({ borders: { borderWidth, borderColor } }) => `${borderWidth[1]} solid ${borderColor}`,
        }}
      >
        <Grid container spacing={2} justifyContent="space-between" py={1}>
          <Grid item xs={12} lg={3}>
            <Typography variant="body1" pt={0.5}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <AppBar position="static">
              <Tabs value={activeTab} onChange={handleTabType}>
                <Tab
                  icon={
                    <Box
                      component="i"
                      color="dark"
                      mr={1.25}
                      sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                      className="fas fa-desktop"
                    />
                  }
                  label="Preview"
                />
                <Tab
                  icon={
                    <Box
                      component="i"
                      color="dark"
                      mr={1.25}
                      sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                      className="fas fa-code"
                    />
                  }
                  label="Code"
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Box>
      <Box display={activeTab === 0 ? 'block' : 'none'}>
        <Box width="100%" p={3}>
          <Box
            bgColor="grey-100"
            width="100%"
            height={height}
            maxHeight="40rem"
            borderRadius="xl"
            sx={{ overflowX: 'hidden', overflowY: 'scroll' }}
          >
            {children}
          </Box>
        </Box>
      </Box>
      <Box display={activeTab === 1 ? 'block' : 'none'} p={3}>
        <Box bgColor="grey-100" position="relative" width="100%" borderRadius="xl" sx={{ overflow: 'hidden' }}>
          <CopyToClipboard text={code}>
            <Button
              variant="gradient"
              color="dark"
              size="small"
              sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
              onClick={() => setSuccess(true)}
            >
              <Box color="white" mr={0.5} className="fas fa-copy" /> Copy
            </Button>
          </CopyToClipboard>
          <Slide direction="down" in={success} unmountOnExit>
            <Box position="absolute" top="0.5rem" left={0} width="100%">
              <Alert
                width="25%"
                mx="auto"
                color="success"
                sx={{ minHeight: '2.5rem !important', py: 1, justifyContent: 'center' }}
              >
                <Typography variant="body2" color="white" fontWeight="regular">
                  Code successfully copied!
                </Typography>
              </Alert>
            </Box>
          </Slide>
          <SyntaxHighlighter
            language="jsx"
            style={prism}
            showLineNumbers
            customStyle={{
              height,
              maxHeight: '40rem',
              fontSize: '1rem',
              backgroundColor: grey[100],
              padding: '1rem 1rem 1rem 0.25rem',
              overflowY: 'scroll',
              margin: 0,
            }}
          >
            {code}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Box>
  );
}

// Setting default props for the View
View.defaultProps = {
  height: 'auto',
};

// Typechecking props for the View
View.propTypes = {
  children: PropTypes.node.isRequired,
  code: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string,
};

export default View;
