import { Container, TextField, Grid } from '@material-ui/core';
import React from 'react';

import './Navbar.scss';

function Navbar() {

  
    return (
    <nav className="navbar">
        <Container maxWidth="sm" className="nav-container">
            <div syle={{ position: 'relative', height: '100%' }}>
                <TextField 
                label="filter countries"
                variant="outlined" 
                fullWidth={true}
                />
            </div>
        </Container>
    </nav>
  );
}

export default Navbar;
