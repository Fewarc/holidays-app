import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardMedia, Container, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

function CountryCard(props) {
    return (
        <div className="main-card">
                    <Card key={props.country.name} variant="outlined" >
                        <Grid container>

                            <Grid item xs={4}>
                                <div className="card-flag"> 
                                    <div className="flag">
                                        <CardMedia component="img" src={props.country.flag} />
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={5}>
                                <div className="card-name">
                                    <h1><strong className="alpha3">{props.country.alpha3Code}</strong> {props.country.name}</h1>
                                </div>
                            </Grid>

                            <Grid item xs={2}>
                                <div className="vert-center">
                                    <div className="holidays">
                                        <Link to={`/calendar/${props.country.alpha3Code}`}>
                                            <Button>
                                                CALENDAR
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={1}>
                                <div className="vert-center">
                                    <FontAwesomeIcon 
                                        className="item fav"  
                                        style={props.country.fav ? {color: "gold"} : {}} 
                                        icon={props.country.fav ? faStar : faRegStar} 
                                        size="3x"
                                        onClick={() => props.updateFavs(props.country)}
                                        />
                                </div>
                            </Grid>

                        </Grid>
                    </Card>
                </div>
    );
};

export default CountryCard;