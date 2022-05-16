// import { useEffect, useState } from "react";
import React from "react";
import DATA from './data.json';
// import LiveSearch from "./components/LiveSearch";
import './suggestion.css';
import './square.css';
import Game from "./Game";
import { Typography } from "@material-ui/core";
// import { AppBar, Toolbar, GlobalStyles, CssBaseline, Link, Button } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import PricingContent from './Pricing';
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  document.title = "Cuble"
  function roundToDay(date) {
    const p = 24 * 60 * 60 * 1000;
    return new Date(Math.floor(date.getTime() / p ) * p);
  }
  const date = new Date();
  const cuber = DATA['persons'][roundToDay(date) % DATA['persons'].length];
  console.log(cuber);

  return (
    <>
    {/* <Header /> */}
    <Typography variant="h3">CUBLE</Typography>
    <Game cuber={cuber} />
    {/* <Footer /> */}
    </>
  )
}

export default App;
