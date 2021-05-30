import { Button, Card, CardMedia, Container, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchCountries } from '../../api/api.js';

import './Main.scss';
import CountryCard from './CountryCard/CountryCard.js';

function Main() {
  
    const [countries, setCountries] = useState([]);
    const [countriesToRender, setCountriesToRender] = useState({
        loading: false,
        countries: []
    });
    const [favCountries, setFavCountries] = useState([]);
    const [filterPhrase, setFilterPhrase] = useState('');

    useEffect(() => {
        fetchCountries()
        .then(res => {
            setCountries(res.data.map(country => ({ ...country, fav: false })) );
            setCountriesToRender({ ...countriesToRender, countries: res.data.map(country => ({ ...country, fav: false })) });
            setFavCountries([]);
        });
    }, []);

    useEffect(() => {
        const newCountries = countries.filter((country) => {
            return country.name.includes(filterPhrase);
        });
        setCountriesToRender({ ...countriesToRender, countries: newCountries });
    }, [filterPhrase]);

    const updateFavourites = (country) => {
        const updatedCountries = [...countriesToRender.countries];
        const updateIndex = updatedCountries.findIndex(e => e.alpha3Code === country.alpha3Code);
        updatedCountries[updateIndex] = { ...updatedCountries[updateIndex], fav: !updatedCountries[updateIndex].fav } // REFACTOR FOR SHOO, SHEEEEEE
        setCountriesToRender({ ...countriesToRender, countries: updatedCountries });
        
        if (country.fav) {
            setFavCountries(favCountries.filter((c) => {
                return c.alpha3Code !== country.alpha3Code;
            }));
        } else {
            setFavCountries([ ...favCountries, { ...country, fav: !country.fav } ]);
        }
    }

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
            {favCountries.length > 0 
            ? favCountries.map((country) => (<CountryCard key={country.alpha3Code + '_fav'} country={country} updateFavs={updateFavourites} />) ) 
            : <h3 className="fav-msg"><i>You've got no favourite countries</i></h3>}
            
            <br/><hr></hr><br/>

            {countriesToRender.countries.map((country) => (
                <CountryCard key={country.alpha3Code} country={country} updateFavs={updateFavourites} />
            ))}
        </Container>
    </div>
  );
}

export default Main;
