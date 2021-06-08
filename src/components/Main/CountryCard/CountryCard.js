import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardMedia, Grid} from '@material-ui/core';
import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';


function CountryCard(props) {
    const matches600 = useMediaQuery('(min-width:600px)');
    const matches650 = useMediaQuery('(min-width:650px)');
    
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
                                    <p><strong className="alpha3" style={ matches600 ? {} : {display: "none"}}>{props.country.alpha3Code}</strong> {props.country.name}</p>
                                </div>
                            </Grid>
                            {!props.alterDisplay && (<Grid item xs={2}>
                                <div className="vert-center">
                                    <div className="holidays">
                                        <Link to={`/calendar/${props.country.alpha2Code}`} style={{ textDecoration: 'none' }}>
                                            <Button size={ matches650 ? "large" : "small"}>
                                                <p>CALENDAR</p>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Grid>)}

                            <Grid item xs={1}>
                                <div className="vert-center">
                                    <FontAwesomeIcon 
                                        className="item fav"  
                                        style={props.country.fav ? {color: "gold", opacity: "100%"} : {}} 
                                        icon={props.country.fav ? faStar : faRegStar} 
                                        size={ matches650 ? "3x" : "2x"}
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