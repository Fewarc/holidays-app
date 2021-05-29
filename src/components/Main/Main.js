import { Card, CardMedia, Container, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchCountries } from '../../api/api.js';

import './Main.scss';

function Main() {
  
    const [countries, updateCountries] = useState([]);
    const [countriesToRender, setCountriesToRender] = useState({
        loading: false,
        countries: []
    });
    const [filterPhrase, setFilterPhrase] = useState('');

    useEffect(() => {
        fetchCountries().then(res => {
            updateCountries(res.data);
            setCountriesToRender({ ...countriesToRender, countries: res.data });
        });
    }, []);

    useEffect(() => {
        const newCountries = countries.filter((country) => {
            return country.name.includes(filterPhrase);
        });
        console.log(newCountries);
        setCountriesToRender({ ...countriesToRender, countries: newCountries });
    }, [filterPhrase]);

    return (
        <div className="main">
            <div className="navbar">
            <Container maxWidth="sm" className="nav-container">
                <div syle={{ position: 'relative', height: '100%' }}>
                    <TextField 
                    label="filter countries"
                    name="filter"
                    variant="outlined" 
                    fullWidth={true}
                    value={filterPhrase}
                    onChange={(e) => setFilterPhrase(e.target.value)}
                    />
                </div>
            </Container>
        </div>
        <Container className="main-container" maxWidth="md">
            {countriesToRender.countries.map((country) => (
                <div className="main-card">
                <Card key={country.name} variant="outlined" >
                    <Grid container>

                        <Grid item xs={4}>
                            <div className="card-flag"> 
                                <div className="flag">
                                    <CardMedia component="img" src={country.flag} />
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className="card-name">
                                <h1><strong className="alpha3">{country.alpha3Code}</strong> {country.name}</h1>
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            
                        </Grid>

                    </Grid>
                </Card>
                </div>
            ))}
        </Container>
    </div>
  );
}

export default Main;
