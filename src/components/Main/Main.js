import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useEffect } from 'react';
import CountryCard from './CountryCard/CountryCard.js';
import Navbar from './Navbar/Navbar.js';
import { getCountries, updateCachedCountries } from '../../actions/countries.js';

import './Main.scss';

function Main() {
    const dispatch = useDispatch();
    const cachedCountries = useSelector(state => state.countries);

    const [countriesToRender, setCountriesToRender] = useState([]); // holds countries that should be rendered considering filter and fav fields
    const [favCountries, setFavCountries] = useState([]);           // holds favourite countries 
    const [filterPhrase, setFilterPhrase] = useState('');           // phrase to filter countries

    useEffect(() => {
        if ( cachedCountries.length === 0 ) {
            console.log("sent countries request"); // if this logs, a reuqest has been sent
            dispatch(getCountries());
        } else {
            setFavCountries(cachedCountries.filter(country => country.fav));
        }
    }, []);

    useEffect(() => {   // loads the countries once the api responded
        setCountriesToRender(cachedCountries);
        setFilterPhrase('');
    }, [cachedCountries]);

    useEffect(() => {   // filters countries to render once filter phrase changes 
        const newCountries = cachedCountries.filter(country => country.name.toLowerCase().includes(filterPhrase.toLowerCase()));
        setCountriesToRender(newCountries);
    }, [filterPhrase]);

    const updateFavourites = (country) => {
        const updatedCountries = cachedCountries;
        const updateIndex = updatedCountries.findIndex(e => e.alpha3Code === country.alpha3Code);   // find index of country to update in cachedCountries
        updatedCountries[updateIndex] = { ...updatedCountries[updateIndex], fav: !updatedCountries[updateIndex].fav }   // change fav of country to update
        setCountriesToRender(updatedCountries);
        
        dispatch(updateCachedCountries(updatedCountries));  // update chachedCountries
        
        if ( country.fav ) {
            setFavCountries(favCountries.filter(c => c.alpha3Code !== country.alpha3Code)); // if country was favourite filter it out from favCountries
        } else {
            setFavCountries([ ...favCountries, { ...country, fav: !country.fav } ]);    // if country was not favourite add it to the favCountries
        }
    }

    return (
        <div className="main">
        <Navbar phrase={filterPhrase} setPhrase={setFilterPhrase} /> {/** Navbar with setFilterFunction passed to it */}
        <Container className="main-container" maxWidth="md">
            {favCountries.length > 0 // display favCountries or just info if they are empty
            ? favCountries.map(country => (<CountryCard key={country.alpha3Code + '_fav'} country={country} updateFavs={updateFavourites} />) ) 
            : <h3 className="fav-msg"><i>You've got no favourite countries</i></h3>}
            
            <br/><hr></hr><br/>

            {countriesToRender.map(country => ( // display all countries 
                <CountryCard key={country.alpha3Code} country={country} updateFavs={updateFavourites} />
            ))}
        </Container>
        <div style={{height: "100px"}/** SPACER */}></div> 
    </div>
  );
}

export default Main;
