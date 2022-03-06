import { useEffect, useState, useRef } from "react";
import React from "react";
import DATA from './data.json';
import './suggestion.css';
import './square.css';
// import Tooltip from './components/tooltip';
// import styled from 'styled-components';
// const TooltipTarget = styled.span``;
import '@cubing/icons';
// import 'flag-icons';
import { Button, Paper, TextField } from '@material-ui/core';
import { Autocomplete, Tooltip, Grid, Typography, Box } from '@mui/material';
import Win from "./components/Win";

export default function Game(props) {
    const [text, setText] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [cuberError, setCuberError] = useState(false);
    const [data, setData] = useState(DATA['names']);
    const [win, setWin] = useState(false);

    const cuber = props.cuber;

    // useEffect(() => {
    //     if(win) {setTimeout(() => {
    //         alert("You Won!")
    //     }, 1000)}
    // }, [win])

    const makeGuess = (guess) => {
        if(win) {return}
        setCuberError(false);
        let valid = false;
        for (let i = 0; i < DATA['persons'].length; i++) {
            if(guess === DATA['persons'][i]['searchableName']) {
                //handle guess
                // if(DATA['persons'][i]['record'] == cuber['record'])

                setGuesses((prevGuesses) => [...prevGuesses, {
                    'id': prevGuesses.length + 1,
                    'record': cuber['records'].every(elem => DATA['persons'][i]['records'].includes(elem)) ? "correct" : DATA['persons'][i]['records'].some(elem => cuber['records'].includes(elem)) ? "someInfo" : "noInfo",
                    'event': cuber['events'].every(elem => DATA['persons'][i]['events'].includes(elem)) ? "correct" : DATA['persons'][i]['events'].some(elem => cuber['events'].includes(elem)) ? "someInfo" : "noInfo",
                    'country': DATA['persons'][i]['personCountryId'] === cuber['personCountryId'] ? "correct" : DATA['persons'][i]['continent'] === cuber['continent'] ? "someInfo" : "noInfo",
                    'person': DATA['persons'][i]
                }])
                valid = true;
                break;
            }
        }
        if(!valid) {
            // alert(`${guess} not a valid guess`);
            setCuberError(true);
        }
        if(guess === cuber['searchableName']) {
            setWin(true)
        }
    }


  return (
    <div>
        <Autocomplete
            disablePortal
            // id="combo-box-demo"
            variant="outlined"
            options={data}
            // sx={{ width: 400 }}
            onInputChange={(e, v) => {setText(v)}}
            onKeyPress={(e, v) => {
                if(e.key === 'Enter') {makeGuess(text)}
            }}
            renderInput={(params) => <TextField {...params}
                variant="outlined" 
                label="Guess a cuber" 
                value={text}
                error={cuberError}
            />}
        />
        {/* <TextField variant="outlined"
            label="Guess a cuber"
            // defaultValue={DATA['names'][Math.floor(Math.random() * DATA['names'].length)]}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
                if(e.key === 'Enter') {makeGuess(e.target.value)}
            }}
            error={cuberError}
        /> */}
        <Button variant="contained" disableElevation onClick={() => makeGuess(text)}>MAKE GUESS</Button>
        <Box>
            <Grid
                container
                spacing={1}
                justifyContent="flex-start"
            >
                <Grid item>
                    <Typography>Record</Typography>
                </Grid>
                <Grid item>
                    <Typography>Event</Typography>
                </Grid>
                <Grid item>
                    <Typography>Country</Typography>
                </Grid>
            </Grid>
        {guesses.map((guess) => (
            <div key={guess.id}>
                <Grid
                    container
                    spacing={0.5}
                    justifyContent="flex-start"
                >
                    <Grid item>
                        <div className={guess.record} />
                    </Grid>
                    <Grid item>
                        <div className={guess.event} />
                    </Grid>
                    <Grid item>
                        <div className={guess.country} />
                    </Grid>
                    <Grid item>
                        <Grid item>
                        {guess['person']['records'].map((record) => (
                            <span>{record} </span>
                        ))}
                        </Grid>
                        <Grid item>
                        {guess['person']['events'].map((event) => (
                            <span className={`cubing-icon event-${event}`} key={`${guess.id}${event}`}> </span>
                        ))}
                        </Grid>
                        <Grid item>{guess['person']['searchableName']}</Grid>
                    </Grid>
                </Grid>
            </div>
        ))}
        </Box>
        {/* {guesses.map((guess) => (
            <div className="guesses" key={guess.id}>
                <div className={guess.record} />
                <div className={guess.event} />
                <div className={guess.country} />
                <div className="records">
                {guess['person']['records'].map((record) => (
                    <span>{record} </span>
                ))}
                </div>
                <div className="events">
                {guess['person']['events'].map((event) => (
                    <span className={`cubing-icon event-${event}`} key={`${guess.id}${event}`}> </span>
                ))}
                </div>
                <Tooltip title={'TEST'} placement={"right"}>
                <div className="person">{guess['person']['searchableName']}</div>
                </Tooltip>
                <div className="person">
                {guess['person']['searchableName']}
                <span className={`flag-icon-${guess['person']['personCountryId']}`}></span>
                </div>
            </div>
        ))} */}
        <div>{win ? <Win /> : ""}</div>
    </div>
  )
}
