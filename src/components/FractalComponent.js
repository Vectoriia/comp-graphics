import * as React from 'react';
import { useState, useEffect } from 'react';
import '../index.css';
import QuestionIcon from '../img/question.svg';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SelectStyle from './CustomElements/SelectStyle.js';
import FractalCarousel from './CustomElements/Carousel';
const themeSlider = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#000000',
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });
  function valuetext(value) {
    return `${value}°C`;
  }
const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#000000',
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });
export default function Fractal (){
    const [limit, setLimit] = useState(4);
    
    useEffect(() => {
        console.log(limit);
    }, [limit])

    return(
        <>
     <div className="container" style={{flexDirection: 'row'}}>
            <div className="fractal-menu">
                <div className ="header"
                    style={{
                        width: '100%',
                        height: '47px',
                        fontSize: '36px',
                        lineHeight: '66px',
                        color: 'black',
                        
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}> Фактали
                <img src={QuestionIcon} />
                </div>
                <div className ="text"
                style={{ color: 'black', width: '100%', textAlign:'left', paddingLeft: '20px',}}>
                    Кількість ітерацій:
                </div>
                <div style={{
                        paddingLeft: '10%', paddingRight: '10%', width: '100%'
                    }}>
                        <ThemeProvider theme={themeSlider}>
                            <Slider
                                aria-label="Temperature"
                                defaultValue={4}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={8}
                                sx = {{width: '100%'}} 
                                value={limit}  
                                onChange={e => setLimit(e.target.value)}
                            />
                        </ThemeProvider>
                </div>
                <div className ="text"
                style={{ color: 'black', width: '100%', textAlign:'left', paddingLeft: '20px',}}>
                    Координати центру:
                </div>
                <div  style={{
                        width: '100%',
                        height: '47px',
                        fontFamily: 'Bitter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}> 
                    <div style={{
                        paddingLeft: '10%', paddingRight: '20px'
                    }}>
                        <ThemeProvider theme={theme}>
                            <TextField id="filled-basic" label="x:"  type="number" InputProps={{ inputProps: { min: 0, max: 200 } }}  variant="filled" />
                        </ThemeProvider>
                    </div>
                    <div style={{
                        paddingLeft: '20px', paddingRight: '10%'
                    }}>
                        <ThemeProvider theme={theme}>
                            <TextField id="filled-basic" label="y:"  type="number" InputProps={{ inputProps: { min: 0, max: 200 } }}  variant="filled" />
                        </ThemeProvider>
                    </div>
                </div>
                <div className ="text"
                style={{ color: 'black', width: '100%', textAlign:'left', paddingLeft: '20px',}}>
                    Лінія побудови:
                </div>
                <div  style={{
                        width: '100%',
                        height: '47px',
                        fontFamily: 'Bitter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}> 
                    <div style={{
                        paddingLeft: '10%', paddingRight: '20px'
                    }}>
                        <ThemeProvider theme={theme}>
                            <SelectStyle/>
                        </ThemeProvider>
                    </div>
                    <div style={{
                        paddingLeft: '20px', paddingRight: '10%'
                    }}>
                        <ThemeProvider theme={theme}>
                            <TextField id="filled-basic" label="y:" variant="filled" />
                        </ThemeProvider>
                    </div>
                </div>
            </div>
            <div className="fractal-field">
                <FractalCarousel color ="blue" limit = {limit}/>
            </div>
        </div>
        </>   
    );
}