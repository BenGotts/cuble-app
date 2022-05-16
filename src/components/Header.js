import React from 'react';
// import qs from 'qs';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, Button } from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
// import Avatar from '@material-ui/core/Avatar';
// import Menu from '@material-ui/core/Menu';
// import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
import { CssBaseline, GlobalStyles } from '@mui/material';


// const useStyles = makeStyles(() => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100vh',
//     overflowY: 'auto',
//   },
//   title: {
//     flexGrow: 1,
//     minWidth: '6em',
//   },
//   titleLink: {
//     color: 'inherit',
//     textDecoration: 'none',
//   },
//   content: {
//     display: 'flex',
//     flexGrow: 1,
//     flexDirection: 'column',
//     alignItems: 'stretch',
//   },
//   roomTitleGrid: {
//     flexGrow: 1,
//   },
// }));

export default function Header() {
//   const classes = useStyles();

  return (
    <>  
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Company name
            </Typography>
            <nav>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                >
                Features
                </Link>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                >
                Enterprise
                </Link>
                <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                >
                Support
                </Link>
            </nav>
            <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Login
            </Button>
            </Toolbar>
        </AppBar>
      </>
  );
}

// Header.propTypes = {
//   user: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     wcaId: PropTypes.string,
//     avatar: PropTypes.shape({
//       thumb_url: PropTypes.string,
//     }),
//   }),
//   room: PropTypes.shape({
//     _id: PropTypes.string,
//     name: PropTypes.string,
//     event: PropTypes.string,
//   }),
// };

// Header.defaultProps = {
//   user: {
//     id: undefined,
//     name: undefined,
//     wcaId: undefined,
//     avatar: {
//       thumb_url: undefined,
//     },
//   },
//   room: {
//     _id: undefined,
//     name: undefined,
//     event: undefined,
//   },
// };

// const mapStateToProps = (state) => ({
//   room: state.room,
//   user: state.user,
//   roomName: state.room.name,
// });

// export default connect(mapStateToProps)(Header);