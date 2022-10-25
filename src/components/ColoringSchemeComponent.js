import ImageDefault from '../img/coloringImage.png';
import React, { useState } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
export default function ColoringScheme (){
    const [limit, setLimit] = useState(50);
    const [file, setFile] = useState();
    const hiddenFileInput = React.useRef(null);
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    return(
        <div className='container'> 
            <div className="coloring-images">
                <div className='image-handler'>
                    <img alt="not found" src={file || ImageDefault} draggable = {false}/>
                </div>
                <div className='image-handler'>
                    <img alt="not found" src={file || ImageDefault} draggable = {false}/>
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
                <Grid item xs={4}>
                <div className ="text"
                style={{ color: 'black', width: '100%', height: '47px'}}>
                    RGB: 244, 42, 33
                </div>
                <div className ="text"
                style={{ color: 'black', width: '100%', height: '47px'}}>
                    HSV: 239°, 0.786, 0.654
                </div>
                </Grid>
                <Grid item xs={4}>
                <div className ="text"
                style={{ color: 'black', width: '100%', height: '47px'}}>
                    Насиченість по зеленому:
                </div>
                <ThemeProvider theme={themeSlider}>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={50}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={0}
                            max={100}
                            sx = {{width: '90%'}} 
                            value={limit}  
                            onChange={e => setLimit(e.target.value)}
                        />
                    </ThemeProvider>
                </Grid>
                <Grid item xs={4}>
                <div className ="text"
                style={{ color: 'black', width: '100%', height: '47px'}}>
                    Конвертувати своє зображення:
                </div>
                    <ColorButton variant="contained" onClick={handleClick}>
                        Upload
                    </ColorButton>
                    <input type="file" onChange={handleChange} ref={hiddenFileInput} style={{display:'none'}}/>
                    <ColorButton variant="contained">
                        Download
                    </ColorButton>
                </Grid>
            </Grid>
            
            </div>
        </div>        
    )
}
