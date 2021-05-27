import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchCountries } from '../../api/api.js';
import Navbar from './Navbar/Navbar.js';

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
        <Navbar />
    </div>
  );
}

export default Main;
