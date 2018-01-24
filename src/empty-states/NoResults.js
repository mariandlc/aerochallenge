import React, {Component} from 'react';
import aerologo from '../assets/aerolab-logo.svg'


const NoResults = () =>{
    return(
        <div className="products">
            <div className="no-results">
                  <img src={aerologo} alt="Aerolab"/>
                <h2>No encontramos productos con esa búsqueda!</h2>
                <p>Probá buscar algo más!</p>
            </div>
        </div>
    )
};

export default NoResults;
