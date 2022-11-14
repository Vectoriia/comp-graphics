import React, { useState } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { useEffect, useRef  } from 'react';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicModal from './CustomElements/BaseModal.js';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#8C74B5'),
    backgroundColor: '#8C74B5',
    '&:hover': {
      backgroundColor: "#79669A",
    },
  }));
  function valuetext(value) {
    return `${value}°C`;
  }
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
  function RGBtoHSV(r, g, b) {
    r /= 255; g /= 255; b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;
  
    var d = max - min;
    s = max == 0 ? 0 : d / max;
  
    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
    h = Math.floor(h*360);
    s = Math.floor(s*100);
    v = Math.floor(v*100);

    return [ h, s, v ];
  }
  function HSVtoRGB(h, s, v) {
    let d = 0.0166666666666666 * h;
	let c = (v/100) * (s/100);
	let x = c - c * Math.abs(d % 2.0 - 1.0);
	let m = (v/100) - c;
	c += m;
	x += m;
    let r, g ,b;
    switch (d >>> 0) {
        case 0: r=c; g=x; b=m; break;
        case 1: r=x; g=c; b=m; break;
        case 2: r=m; g=c; b=x; break;
        case 3: r=m; g=x; b=c; break;
        case 4: r=x; g=m; b=c; break;
        default: r=c; g=m; b=x;
    }
     
    return [  Math.floor(r * 255),  Math.floor(g * 255),  Math.floor(b * 255) ];
}
  let ctx1 = null;
  let ctx2 = null;
  let curCtx
export default function ColoringScheme (){

    let zoom = null;
    const canvasRef1 = useRef(null)
    const canvasRef2 = useRef(null)
    const zoomRef = useRef(null)
    const [saturation, setSaturation] = useState(0);
    const [file, setFile] = useState();
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = file ||'https://images.pexels.com/photos/6899804/pexels-photo-6899804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       
        img.onload = () => {
            const canvas1 = canvasRef1.current
            ctx1 = canvas1.getContext('2d')
            ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
            ctx1.drawImage(img, 0, 0, canvas1.width, canvas1.height);
            const canvas2 = canvasRef2.current
            ctx2 = canvas2.getContext('2d')
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height);
            const zoomCanvas = zoomRef.current
            zoom = zoomCanvas.getContext('2d')
          };
    },[file])
    const hiddenFileInput = React.useRef(null);
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    } 
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const changeSaturationHandler = event=>
    {
        setSaturation(event.target.value)
    }
    const download = (e) =>{
        e.preventDefault();
        if(canvasRef2 != null){
            const url = canvasRef2.current.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'coloringSheme.png';
            link.href = url;
            link.click();
        }
        
      };
    const [rgba, setRgba] = useState([0,0,0,0]);
    const [hsvGlobal, setHsv] = useState([0,0,0]);
    const handleMouseMove = event => {
        let canvas
        let bounding
        if(event.target === canvasRef1.current){
            canvas = canvasRef1.current
            bounding = canvas.getBoundingClientRect();
            curCtx = ctx1
        }else if(event.target === canvasRef2.current){
            canvas = canvasRef2.current
            bounding = canvas.getBoundingClientRect();
            curCtx = ctx2
        }else{
            return
        }
        
        const x = event.clientX - bounding.left;
        const y = event.clientY - bounding.top;
        const pixel = curCtx.getImageData(x, y, 1, 1);
        const data = pixel.data;
        
        const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        setRgba([data[0], data[1], data[2], data[3]])
        const hsv = RGBtoHSV(data[0], data[1], data[2])
        setHsv(hsv)
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = file ||'https://images.pexels.com/photos/6899804/pexels-photo-6899804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        const zoomCanvas = zoomRef.current
        zoom = zoomCanvas.getContext('2d')
        zoom.imageSmoothingEnabled = true;
        zoom.mozImageSmoothingEnabled = true;
        zoom.webkitImageSmoothingEnabled = true;
        zoom.msImageSmoothingEnabled = true;
        var res = function(curCtx, x, y) {
        curCtx.drawImage(canvas,
        Math.min(Math.max(0, x - 5), img.width - 10),
        Math.min(Math.max(0, y - 5), img.height - 10),
        5, 5,
        0, 0,
        100, 100);}
        res(zoom,x,y)
    }
    useEffect(() => {
        if (ctx1) applyChange();
      }, [saturation]);
    const applyChange = () => {
        const imgData = ctx1.getImageData(
          0,
          0,
          canvasRef2.current.width,
          canvasRef2.current.height
        );
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const hsv = RGBtoHSV(
            imgData.data[i],
            imgData.data[i + 1],
            imgData.data[i + 2]
          );
          if (hsv[0]<=190 && hsv[0] >=75) {
            hsv[1] += saturation;
            if(hsv[1]>100) hsv[1]=100;
            else if(hsv[1]<0)hsv[1]=0;
          }
          const rgb = HSVtoRGB(hsv[0], hsv[1], hsv[2]);
          imgData.data[i] = rgb[0];
          imgData.data[i + 1] = rgb[1];
          imgData.data[i + 2] = rgb[2];
        }
        console.log(imgData)
        ctx2.clearRect(0, 0, canvasRef2.current.width, canvasRef2.current.height);
        ctx2.putImageData(imgData,  0, 0);
    }

    return(
        <div className='container'> 
          <div className="coloring-images" style={{margin: '10px 0'}}>
            <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  gap: '80px',
                }}
            >  
                <div className='image-handler'>
                    {/*<img alt="not found" src={file || 'https://images.pexels.com/photos/6899804/pexels-photo-6899804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} draggable = {false} width="500px" height = "500px"/>*/}
                    <canvas ref={canvasRef1} height="500px" width= "600px" onMouseMove={handleMouseMove}/>
                </div>
                <div className='image-handler'>
                    <canvas ref={canvasRef2} height="500px" width= "600px" onMouseMove={handleMouseMove}/>
                </div>
            </div>
          </div>
          <div className="coloring-menu">
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={4}
            >  
              <Grid item xs={1}>
                  <canvas ref={zoomRef} width="100" height="100"/>
              </Grid>
              <Grid item xs={3}>
                <div className ="text"
                  style={{ color: 'black', width: '100%', height: '47px'}}
                >
                    RGB: {rgba[0]}, {rgba[1]}, {rgba[2]}
                </div>
                <div className ="text"
                  style={{ color: 'black', width: '100%', height: '47px'}}
                >
                    HSV: {hsvGlobal[0]}°, {hsvGlobal[1]}, {hsvGlobal[2]} 
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className ="text"
              style={{ color: 'black', width: '100%', height: '47px'}}>
                  Насиченість по зеленому:
                </div>
                <ThemeProvider theme={themeSlider}>
                      <Slider
                          aria-label="Temperature"
                          defaultValue={0}
                          getAriaValueText={valuetext}
                          valueLabelDisplay="auto"
                          step={5}
                          marks
                          min={-100}
                          max={100}
                          sx = {{width: '90%'}} 
                          value={saturation}  
                          onChange={e => setSaturation(e.target.value)}
                      />
                  </ThemeProvider>
              </Grid>
              <Grid item xs={4}>
                <div className ="text"
                  style={{ color: 'black', width: '100%', height: '47px'}}
                >
                  Конвертувати своє зображення:
                </div>
                <ColorButton variant="contained" onClick={handleClick} style ={{marginRight: "40px", marginLeft:"8px", width: "120px"}}>
                    Upload
                </ColorButton>
                <input type="file" onChange={handleChange} ref={hiddenFileInput} style={{display:'none'}}/>
                <ColorButton variant="contained" onClick={e => download(e)} style ={{width: "120px"}}>
                    Download
                </ColorButton>
              </Grid>
            </Grid>
            <HelpOutlineIcon size = "50px" fontSize='large' onClick={handleOpen} style= {{position: 'absolute', alignSelf: 'end', marginLeft: '10px'}} />
                        <BasicModal open = {openModal} 
                                    handleClose = {handleClose} 
                                    text = "    На цій сторінці ти маєш змогу перевести зображення з колірної моделі RGB в HSV. Ти можеш вивантажити власне зображення та потім завантажити опрацьоване. Також при наведені на зображення внизу ліворуч можна побачити колірні координати пікселя. За допомогою повзунка ти можеш контролювати насиченість по зеленмоу для вихідного зображення."
                                    />
          </div>
        </div>        
    )
}
