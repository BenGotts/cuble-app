// import { useEffect, useState } from "react";
import React from "react";
import DATA from './data.json';
// import LiveSearch from "./components/LiveSearch";
import './suggestion.css';
import './square.css';
import Game from "./Game";
import { Typography } from "@material-ui/core";
// import Footer from "./components/Footer";

function App() {
  document.title = "Cuble";
  // const [persons, setPersons] = useState([]);
  // const [text, setText] = useState('');
  // const [suggestions, setSuggestions] = useState([]);

  // useEffect(() => {
  //     setPersons(DATA['persons']);
  // }, []);

  // const onChangeHandler = (text) => {
  //   let matches = []
  //   if (text.length > 0) {
  //     matches = persons.filter(p => {
  //       const regex = new RegExp(`${text}`, 'gi');
  //       return p.searchableName.match(regex)
  //     })
  //   }
  //   setSuggestions(matches)
  //   setText(text)
  // }

  function roundToDay(date) {
    const p = 24 * 60 * 60 * 1000;
    return new Date(Math.floor(date.getTime() / p ) * p);
  }
  const date = new Date();
  const cuber = DATA['persons'][roundToDay(date) % DATA['persons'].length];
  console.log(cuber);

  return (
    <>
    <Typography variant="h3">CUBLE</Typography>
    {/* <h1>CUBLE</h1> */}
    <Game cuber={cuber} />
    {/* <div className="noInfo" />
    <div className="correct" />
    <div className="someInfo" /> */}
    {/* <input type='text'
      onChange={e => onChangeHandler(e.target.value)}
      value={text}
      onBlur={() => {
        setTimeout(() => {
          setSuggestions([])
        }, 100);
      }}
    />
    {suggestions && suggestions.map((suggestion,i) =>
      <div key={suggestion.personId} className='suggestion'
      onClick={() => {
        setText(suggestion.searchableName)
        setSuggestions([])
      }}>
        {suggestion.searchableName}
      </div>
    )} */}
    {/* <LiveSearch /> */}
    </>
  )
}

export default App;
