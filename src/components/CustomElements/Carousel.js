import React, { Component } from 'react';
import './..\\..\\index.css';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import TfractalCanvas from './TfractalCanvas.js';
import FrostyFractalCanvas from './FrostyFractalCanvas.js';
import { useState, useRef } from 'react';
import DownloadingIcon from '@mui/icons-material/Downloading';
var canvasRef1, canvasRef2;
export default function FractalCarousel (props){

    const tcanvasRef = useRef(null);
    const frostyfractalRef = useRef(null);

    const handleCanvas1Download = (e) =>{
        e.preventDefault();
        if(tcanvasRef != null){
            const url = tcanvasRef.current.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'Tfractal.png';
            link.href = url;
            link.click();
        }
        
      };
      const handleCanvas2Download = (e) =>{
        e.preventDefault();
        if(frostyfractalRef != null){
            const url = frostyfractalRef.current.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'Icefractal.png';
            link.href = url;
            link.click();
        }
        
      };
    return (
        <Carousel showArrows = {false} showStatus ={false} showThumbs={false} width = '720px' height = '650px'>
            <div>
                <div style={{
                        width: '100%',
                        height: '47px',
                        fontSize: '30px', 
                        paddingTop: '0px',
                        lineHeight: '66px',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <div className='header' style={{fontSize: '31px'}}>T-фрактал</div>
                    <DownloadingIcon fontSize='64x'onClick={(e) => handleCanvas1Download(e)}/> 
                </div>
                <TfractalCanvas ref={tcanvasRef} width='600px' height='600px' color = {props.color} limit = {props.limit} pattern = {props.pattern} x = {props.x} y = {props.y}/>
            </div>
            <div>
            <div style={{
                        width: '100%',
                        height: '47px',
                        fontSize: '30px', 
                        paddingTop: '0px',
                        lineHeight: '66px',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <div className='header' style={{fontSize: '31px'}}>Льодовий фрактал</div>
                    <DownloadingIcon fontSize='64x'onClick={(e) => handleCanvas2Download(e)}/> 
                </div>
                <DownloadingIcon fontSize='64x' onClick={(e) => handleCanvas2Download(e)}/> 
                <FrostyFractalCanvas ref={frostyfractalRef} width='600px' height='600px' color = {props.color} limit = {props.limit} pattern = {props.pattern} x = {props.x} y = {props.y}/>
            </div>
        </Carousel>
    );
};