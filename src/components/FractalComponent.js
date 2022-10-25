import * as React from 'react';
import { useState, useEffect } from 'react';
import '../index.css';
import QuestionIcon from '../img/question.svg';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SelectStyle from './CustomElements/SelectStyle.js';
import FractalCarousel from './CustomElements/Carousel';
import DownloadingIcon from '@mui/icons-material/Downloading';
import Button from '@mui/material/Button';
import { SketchPicker } from 'react-color';
import DownloadIcon from '../img/downloadIcon.svg';
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
  function download(){
    var canvas = document.getElementById("canvas");
    var url = canvas.toDataURL("image/png");
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = url;
    link.click();
  }
  
export default function Fractal (){
    const [limit, setLimit] = useState(4);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [style, setStyle] = useState([]);
    const [open, setopen] = useState(false);
    const [color, setColor] = useState('#ffffff');
    const [buttonColor, setButtonColor] = useState('#000000');
    useEffect(() => {
        console.log(limit);
    }, [limit]);
    const changeStyleHandler = event => {
        console.log(event.target.value);
        setStyle(event.target.value);
      };
      const changeXHandler= event => {
        setX(Number(event.target.value));
        
      };
      const changeYHandler = event => {
        setY(Number(event.target.value));
      };
    const openBox = () => {
        setopen(!open);
        if(color === '#ffffff'){
            setButtonColor('#000000')
        }
        else if(open === true){
            setButtonColor(color)
        }
    };

    return(
        <div className="container" style={{flexDirection: 'row', height: '94%'}}>
            <div className="fractal-menu" style={{ width: '600px'}}>
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
                    }}> Фрактали
                    <div style={{display: "flex"}}>
                        <img src={QuestionIcon} />
                        {/*<img src={DownloadIcon} onClick={() => this.handleCanvasDownload(this.canvasRef)}/>*/}
                    </div>
                </div>
                <div className ="text"
                    style={{ color: 'black', width: '100%', paddingLeft: '30px', marginTop: '22px'}}>
                    Кількість ітерацій:    
                    <div className ="text"
                    style={{ paddingLeft: '40px'}}>    
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
                            sx = {{width: '90%'}} 
                            value={limit}  
                            onChange={e => setLimit(e.target.value)}
                        />
                    </ThemeProvider>
                    </div>    
                </div>
                <div className ="text"
                style={{ color: 'black', width: '100%', paddingLeft: '30px', marginTop: '49px', height: '47px'}}>
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
                            <TextField 
                                id="filled-basic" 
                                label="x:"  
                                type="number" 
                                InputProps={{ inputProps: { min: -200, max: 200, step: "10" } }}  
                                variant="filled" 
                                onChange={(e) => changeXHandler(e)}
                                style={{ 
                                    height: "50px", 
                                    width: "180px", 
                                    fontFamily: 'Bitter', 
                                    fontStyle: "normal",
                                    fontWeight: "500", 
                                    fontSize: "15px"}} />
                        </ThemeProvider>
                    </div>
                    <div style={{
                        paddingLeft: '20px', paddingRight: '10%'
                    }}>
                        <ThemeProvider theme={theme}>
                            <TextField 
                                id="filled-basic" 
                                label="y:"  
                                type="number" 
                                step = {10}
                                InputProps={{ inputProps: { min: -200, max: 200, step: "10"  }}}  
                                variant="filled" 
                                onChange={(e) => changeYHandler(e)}
                                style={{ 
                                    height: "50px", 
                                    width: "180px", 
                                    fontFamily: 'Bitter', 
                                    fontStyle: "normal",
                                    fontWeight: "500", 
                                    fontSize: "15px"}}/>
                        </ThemeProvider>
                    </div>
                </div>
                <div className ="text"
                style={{ color: 'black', width: '100%', textAlign:'left', paddingLeft: '20px', marginTop: '49px', height: '47px'}}>
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
                            <SelectStyle changeHandler={changeStyleHandler}/>
                        </ThemeProvider>
                    </div>
                    <div style={{
                        paddingLeft: '20px', paddingRight: '10%'
                    }}>
                    {open &&<SketchPicker  color={color} onChangeComplete = { ( color )=> { setColor ( color.hex ) } }/>}
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" 
                                onClick={() => openBox()}className="value" 
                                style={{
                                    backgroundColor: buttonColor, 
                                    height: "50px", 
                                    width: "180px", 
                                    fontFamily: 'Bitter', 
                                    fontStyle: "normal",
                                    fontWeight: "500", 
                                    fontSize: "15px"}}  >
                            {open === true ? 'Закрити' : 'Змінити колір'}
                        </Button>
                    </ThemeProvider>
                    
                    </div>
                </div>
            </div>
            <div className="fractal-field" style={{flex: 1}}>
                <FractalCarousel color ={color} limit = {limit} pattern = {style} x = {x} y = {y} />
            </div>
        </div>
    );
}