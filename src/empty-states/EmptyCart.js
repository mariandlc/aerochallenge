import React, {Component} from 'react';
import aerologo from '../assets/aerolab-logo.svg'


const EmptyCart = (props) =>{
    return(
        <div className="empty-cart">
            <img src={aerologo} alt="empty-cart"/>
            <h2>No canjeaste nada todavía.</h2>
        </div>
    )
};

export default EmptyCart;
