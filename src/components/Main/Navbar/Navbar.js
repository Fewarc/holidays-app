import React from 'react';
import { Container, TextField } from '@material-ui/core';


function Navbar(props) {
    return (
        <div className="navbar">
            <Container maxWidth="sm" className="nav-container">
                <div syle={{ position: 'relative', height: '100%' }}>
                    <TextField 
                        label="filter countries"
                        name="filter"
                        variant="outlined" 
                        fullWidth={true}
                        value={props.phrase}
                        onChange={(e) => props.setPhrase(e.target.value)}
                    />
                </div>
            </Container>
        </div>
);
};


export default Navbar;