import { Card, CardMedia, Container, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchCountries } from '../../api/api.js';

import './Main.scss';

function Main() {
  
    const [countries, updateCountries] = useState([]);

    let countriesToRender;

    useEffect(() => {
        fetchCountries().then(res => {
            updateCountries(res.data);
            console.log(countries);
        });
    }, []);
  
    return (
        <div className="main">
            <div className="navbar">
            <Container maxWidth="sm" className="nav-container">
                <div syle={{ position: 'relative', height: '100%' }}>
                    <TextField 
                    label="filter countries"
                    variant="outlined" 
                    fullWidth={true}
                    />
                </div>
            </Container>
        </div>
        <Container className="main-container" maxWidth="md">
            {countries.map(country => (
                <Card variant="outlined" className="main-card">
                    <Grid container>
                        <Grid item xs={4}>
                            <div className="card-flag"> 
                                <div className="flag">
                                    <CardMedia component="img" src={country.flag} />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="card-name">
                                <h1>{country.name}</h1>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </Container>
    </div>
  );
}

export default Main;
