import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import TfractalCanvas from './TfractalCanvas.js';
import FrostyFractalCanvas from './FrostyFractalCanvas.js';

export default function FractalCarousel (props){
    return (
        <Carousel showArrows = {false} showStatus ={false} showThumbs={false} width = '720px' height = '650px'>
            <div>
                <p className='header' style = {{fontSize: '32px'}}>T-фрактал</p>
                <TfractalCanvas width='600px' height='600px' color = {props.color} limit = {props.limit} pattern = {props.pattern} x = {props.x} y = {props.y}/>
            </div>
            <div>
                <p className='header' style = {{fontSize: '32px'}}>Льодовий фрактал</p>
                <FrostyFractalCanvas width='600px' height='600px' color = {props.color} limit = {props.limit} pattern = {props.pattern} x = {props.x} y = {props.y}/>
            </div>
        </Carousel>
    );
};