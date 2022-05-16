import React from 'react';
import { CssBaseline, Box, Typography, Container, Link } from '@material-ui/core';


const Links = [{
  text: 'Donate',
  url: 'https://calebhoover.com/donate',
}, {
  text: 'Contribute Idea',
  url: 'https://docs.google.com/forms/d/1YgroYi7_VRj2VrTxNa2ytV099MaVV9rGbC8KVH0tdx0/edit#responses',
}, {
  text: 'Future',
  url: 'https://github.com/coder13/LetsCube/wiki/Future',
}, {
  text: 'GitHub',
  url: 'https://github.com/coder13/letscube',
}, {
  text: 'Contact',
  url: 'mailto:choover11+letscube@gmail.com',
}, {
  text: 'Version',
  url: 'https://github.com/coder13/letscube',
}];

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      {/* <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Sticky footer
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
      </Container> */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}
