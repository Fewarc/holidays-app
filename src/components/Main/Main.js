import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useEffect } from 'react';

import './Main.scss';
import CountryCard from './CountryCard/CountryCard.js';
import Navbar from './Navbar/Navbar.js';
import { getCountries } from '../../actions/countries.js';

function Main() {
    const dispatch = useDispatch();
    const cachedCountries = useSelector( (state) => state.countries );

    const [countries, setCountries] = useState([]);
    const [countriesToRender, setCountriesToRender] = useState({
        loading: false,
        countries: []
    });
    const [favCountries, setFavCountries] = useState([]);
    const [filterPhrase, setFilterPhrase] = useState('');
    const [rerender, setRerender] = useState(false);

    const updateCountries = () => {
        setCountries( cachedCountries );
        setCountriesToRender({ ...countriesToRender, countries: cachedCountries });
    }

    useEffect(() => {
        if (cachedCountries.length === 0) {
            console.log("sent countries request");
            dispatch(getCountries());
        } else {
            setRerender(!rerender);
        }
    }, []);

    useEffect(() => {
        setRerender(!rerender);
    }, [cachedCountries]);

    useEffect(() => {
        updateCountries();
    }, [rerender])

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
        <Navbar phrase={filterPhrase} setPhrase={setFilterPhrase} />
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
