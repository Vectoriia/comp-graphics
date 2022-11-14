import '../index.css';
import { useEffect, useRef, useState  } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SelectVertex from './CustomElements/SelectVertex.js';
import BasicModal from './CustomElements/BaseModal.js';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DownloadingIcon from '@mui/icons-material/Downloading';
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
  const inputTheme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#FFFFFF',
        darker: '#FFFFFF',
      },
      neutral: {
        main: '#FFFFFF',
        contrastText: '#FFFFFF',
      },
    }
  });
  const options = {
    shouldForwardProp: (prop) => prop !== 'fontColor',
  };

  let ctx = null;
  let canvasRef= null;
  const systemScale = 22;
  let isDone = false;
  var AfterDoneTriangle = [[1,3],[2,5],[4,3]];
export default function AffineTransformation (){
    const [x, setX] = useState(1);
    const [y, setY] = useState(1);
    const [vertex, setVertex] = useState('A');
    const [angle, setAngle] = useState(90);
    const [ACord, setACord] = useState([1, 3]);
    const [BCord, setBCord] = useState([2, 5]);
    const [CCord, setCCord] = useState([4,3]);
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    canvasRef = useRef(null)
    const changeVertexHandler = event => {
        setVertex(event.target.value);
    };
    const changeAngleHandler = event => {
        setAngle(event.target.value);
    };
    const changeXHandler= event => {
        setX(Number(event.target.value));
    };
    const changeYHandler = event => {
        setY(Number(event.target.value));
    };
    const changeACordXHandler = event=>{
        setACord([Number(event.target.value), ACord[1]]);
    };
    const changeACordYHandler = event=>{
        setACord([Number(ACord[0]), event.target.value]);
    };
    const changeBCordXHandler = event=>{
        setBCord([Number(event.target.value), BCord[1]]);
    };
    const changeBCordYHandler = event=>{
        setBCord([Number(BCord[0]), event.target.value]);
    };
    const changeCCordXHandler = event=>{
        setCCord([Number(event.target.value), CCord[1]]);
    };
    const changeCCordYHandler = event=>{
        setCCord([Number(CCord[0]), event.target.value]);
    };
    useEffect(() => {
        DrawBackground();
      }, []);
      useEffect(() => {
        if(!checkTriangle(ACord[0], ACord[1], BCord[0], BCord[1], CCord[0], CCord[1])){
            alert("Координати введені неправильно. Це не трикутник");
        }
        drawTriangle();
      }, [ACord,BCord,CCord]);
      function handleDone (e) {
        isDone = true;
        console.log(AfterDoneTriangle);
        setACord([AfterDoneTriangle[0][0],AfterDoneTriangle[0][1]]);
        setBCord([AfterDoneTriangle[1][0],AfterDoneTriangle[1][1]]);
        setCCord([AfterDoneTriangle[2][0],AfterDoneTriangle[2][1]]);
        drawTriangle();
      };
      const drawTriangle = event=>{
        let center = Math.round(canvasRef.current.width / 2);
        let x1 = center + ACord[0]*systemScale;let x2 = center + BCord[0]*systemScale; let x3 = center + CCord[0]*systemScale;
        let y1 = center - ACord[1]*systemScale;let y2 = center - BCord[1]*systemScale; let y3 = center - CCord[1]*systemScale;
        ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        DrawBackground();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.stroke();
      }
      const handleCanvasDownload = (e) =>{
        e.preventDefault();
        if(canvasRef != null){
            const url = canvasRef.current.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'affinity.png';
            link.href = url;
            link.click();
        }
        
      };
    return(
        <div className="container" style={{flexDirection: 'row', height: '94%', backgroundColor: 'black'}}>
        <div className="affinity-field" style={{flex: 1}}>
            <canvas ref={canvasRef} height="660px" width= "660px"/>
        </div>
        <div className="affinity-menu" style={{ width: '600px', marginLeft: '35px', marginRight: '35px'}}>
            <div className ="header"
                    style={{
                        width: '100%',
                        height: '47px',
                        fontSize: '36px',
                        lineHeight: '66px',
                        color: 'white',
                        
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}> Афінне перетворення

                    <div style={{display: "flex",flexDirection: 'row',
                        justifyContent: 'space-around',}}>
                        <DownloadingIcon fontSize='32px'onClick={(e) => handleCanvasDownload(e)}/>
                        <HelpOutlineIcon fontSize='32px'onClick={handleOpen} />
                        <BasicModal open = {openModal} 
                                    handleClose = {handleClose} 
                                    text = "    На цій сторінці ти маєш змогу застосувати афінні перетворення для взаємодії з трикутником.  Для початку задай координати вершин, які заманеться. Далі є дві можливості для задання ветора руху: можна задати кут повороту та обрати вершину навколо якої він буде відбуватися(проти годинникової стрілки), після чого ти можеш обрати коефіцієнт зміни розміру за х чи у (тобто за віссю абсцис чи ординат). Натисни кнопку застосувати, трикутник продовжить заданий рух до моменту виходу за межі координатної площини. Ти можеш у будь-який момент зупинити його рух та змінити конфігурації. А за допомогою кнопки праворуч від назви можна завантажити результуюче зображення."
                                    />
                        {/*<img src={DownloadIcon} onClick={() => this.handleCanvasDownload(this.canvasRef)}/>*/}
                    </div>
                </div>
                <div  style={{
                        width: '100%',
                        height: '47px',
                        fontFamily: 'Bitter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}> 
                <div className ="text"
                    style={{ color: 'white', paddingLeft: '100px', height: '20px'}}>
                    A:
                </div>
                    <div style={{ paddingLeft: '10%', paddingRight: '10px' }}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField 
                                id="filled-basic" 
                                label="x-coef"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}             
                                step = {1}            
                                InputProps={{ inputProps: { min: -15, max: 15, step: "1" } }} 
                                value = {ACord[0]}
                                variant="standard"
                                onChange={(e) => changeACordXHandler(e)}
                                sx={{
                                    "& .MuiFilledInput-input": {
                                        border: '1px solid orange',
                                        borderRadius: 1
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white'
                                    },
                                    '& .MuiFilledInput-underline:after': {
                                        borderBottomColor: 'white'
                                    },
                                }} 
                                className = "input-default-style" />
                        </ThemeProvider>
                    </div>
                    <div style={{ paddingRight: '100px' }}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField 
                                id="filled-basic" 
                                label="y-coef"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}                         
                                InputProps={{ inputProps: { min: -15, max: 15, step: "1" } }} 
                                value = {ACord[1]}
                                variant="standard"
                                sx={{
                                    "& .MuiFilledInput-input": {
                                        border: '1px solid orange',
                                        borderRadius: 1
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white'
                                    },
                                    '& .MuiFilledInput-underline:after': {
                                        borderBottomColor: 'white'
                                    },
                                }}
                               // InputProps={{ inputProps: { min: -200, max: 200, step: "10" } }}  
                                onChange={(e) => changeACordYHandler(e)}
                            className = "input-default-style" />
                        </ThemeProvider>
                    </div>
                </div>
                <div  style={{
                        width: '100%',
                        height: '47px',
                        fontFamily: 'Bitter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}> 
                <div className ="text"
                    style={{ color: 'white', paddingLeft: '100px', height: '20px'}}>
                    B:
                </div>
                <div style={{paddingLeft: '10%', paddingRight: '10px' }}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField 
                                id="filled-basic" 
                                label="x-coef"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}             
                                step = {1}            
                                InputProps={{ inputProps: { min: -15, max: 15, step: "1" } }} 
                                value = {BCord[0]}
                                variant="standard"
                                sx={{
                                    "& .MuiFilledInput-input": {
                                        border: '1px solid orange',
                                        borderRadius: 1
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white'
                                    },
                                    '& .MuiFilledInput-underline:after': {
                                        borderBottomColor: 'white'
                                    },
                                }}
                                //InputProps={{ inputProps: { min: -200, max: 200, step: "10" } }}  
                                onChange={(e) => changeBCordXHandler(e)}
                                className = "input-default-style" />
                        </ThemeProvider>
                    </div>
                    <div style={{paddingRight: '100px'}}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField 
                                id="filled-basic" 
                                label="y-coef"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}             
                                step = {1}       
                                InputProps={{ inputProps: { min: -15, max: 15, step: "1" } }} 
                                value = {BCord[1]}
                                variant="standard"
                                sx={{
                                    "& .MuiFilledInput-input": {
                                        border: '1px solid orange',
                                        borderRadius: 1
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white'
                                    },
                                    '& .MuiFilledInput-underline:after': {
                                        borderBottomColor: 'white'
                                    },
                                }}
                                onChange={(e) => changeBCordYHandler(e)}
                                className = "input-default-style"/>
                        </ThemeProvider>
                    </div>
                </div>
                <div  style={{
                        width: '100%',
                        height: '47px',
                        fontFamily: 'Bitter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}> 
                <div className ="text"
                    style={{color: 'white', paddingLeft: '100px', height: '20px'}}>
                    C:
                </div>
                <div style={{ paddingLeft: '10%', paddingRight: '10px'}}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField 
                                id="filled-basic" 
                                label="x-coef"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}             
                                step = {1}            
                                InputProps={{ inputProps: { min: -15, max: 15, step: "1" } }} 
                                value = {CCord[0]}
                                variant="standard"
                                sx={{
                                    "& .MuiFilledInput-input": {
                                        border: '1px solid orange',
                                        borderRadius: 1
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white'
                                    },
                                    '& .MuiFilledInput-underline:after': {
                                        borderBottomColor: 'white'
                                    },
                                }}
                                onChange={(e) => changeCCordXHandler(e)}
                                className = "input-default-style" />
                        </ThemeProvider>
                    </div>
                    <div style={{paddingRight: '100px'}}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField 
                                id="filled-basic" 
                                label="y-coef"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}             
                                step = {1}            
                                InputProps={{ inputProps: { min: -15, max: 15, step: "1" } }} 
                                value = {CCord[1]}
                                variant="standard"
                                sx={{
                                    "& .MuiFilledInput-input": {
                                        border: '1px solid orange',
                                        borderRadius: 1
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white'
                                    },
                                    '& .MuiFilledInput-underline:after': {
                                        borderBottomColor: 'white'
                                    },
                                }}
                                onChange={(e) => changeCCordYHandler(e)}
                                className = "input-default-style" />
                        </ThemeProvider>
                    </div> 
                    
                </div>                       
                <div  style={{
                        width: '100%',
                        height: '52px',
                        fontFamily: 'Bitter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'left',
                        alignItems: 'center',
                    }}> 
                    <div className ="text"
                        style={{ color: 'white', width: '200px', paddingLeft: '20px', marginTop: '15px', height: '20px'}}>
                        Рух за вершиною:
                    </div>
                    <SelectVertex changeHandler={changeVertexHandler}/>
                    <div className ="text"
                        style={{ color: 'white', width: '80px', paddingLeft: '5px', marginTop: '15px', height: '20px'}}>
                        на кут
                    </div>
                    <div style = {{paddingTop: '28px', width: '70px'}}>
                    <ThemeProvider theme={inputTheme}>
                            <TextField 
                                id="filled-basic" 
                                label=""  
                                type="number" 
                                step = {10}
                                InputProps={{ inputProps: { min: -360, max: 360, step: "10" } }}  
                                variant="outlined" 
                                value = {angle}
                                onChange={(e) => changeAngleHandler(e)}
                                className = "input-default-style" 
                                sx={{
                                    '& .MuiInputBase-root': {
                                        color: 'white'
                                    },
                                    '& .MuiInputBase-input': {
                                        backgroundColor: theme.palette.background.black,
                                        border: '2px solid #ffffff',
                                        borderRadius: 1,
                                        fontSize: 16,
                                        color: '#ffffff',
                                        padding: '10px 12px 10px 12px',
                                        // Use the system font instead of the default Roboto font.
                                        
                                      },
                                }}/>
                        </ThemeProvider>
                        </div>
                </div>
                <div className ="text"
                style={{ color: 'white', width: '100%', textAlign:'left', paddingLeft: '20px', marginTop: '49px', height: '47px'}}>
                    Масштабування:
                </div>
                <div  style={{
                        width: '100%',
                        height: '47px',
                        fontFamily: 'Bitter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}> 
                    <div className ="text"
                        style={{color: 'white', paddingLeft: '100px', height: '20px', paddingBottom: '38px'}}>
                        x:
                    </div>
                    <div>
                        <ThemeProvider theme={inputTheme}>
                            <TextField 
                                id="filled-basic" 
                                label=""
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}             
                                step = {0.1}            
                                InputProps={{ inputProps: { min: 0, max: 5, step: "0.1" } }} 
                                value = {x}
                                variant="standard"
                                sx={{
                                    "& .MuiFilledInput-input": {
                                        border: '1px solid orange',
                                        borderRadius: 1
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white'
                                    },
                                    '& .MuiFilledInput-underline:after': {
                                        borderBottomColor: 'white'
                                    },
                                }}
                                onChange={(e) => changeXHandler(e)}
                                className = "input-default-style"
                                />
                        </ThemeProvider>
                    </div>
                    <div className ="text"
                        style={{color: 'white', height: '20px', paddingBottom: '38px'}}>
                        y:
                    </div>
                    <div style={{ paddingRight: '100px'}}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField 
                                id="filled-basic" 
                                label=""
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}             
                                step = {0.1}            
                                InputProps={{ inputProps: { min: 0, max: 5, step: "0.1" } }} 
                                value = {y}
                                variant="standard"
                                sx={{
                                    "& .MuiFilledInput-input": {
                                        border: '1px solid orange',
                                        borderRadius: 1
                                    },
                                    '& .MuiInputBase-root': {
                                        color: 'white'
                                    },
                                    '& .MuiFilledInput-underline:after': {
                                        borderBottomColor: 'white'
                                    },
                                }}  
                                onChange={(e) => changeYHandler(e)}
                                className = "input-default-style"/>
                        </ThemeProvider>
                    </div>
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
                            paddingLeft: '10%', paddingRight: '20px', paddingTop: '30px'
                        }}>
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" 
                                        onClick={async () => await DoAffine(ACord[0], ACord[1], BCord[0],BCord[1],CCord[0], CCord[1], vertex, angle, x, y)}
                                        //onClick={() => openBox()}className="value" 
                                        style={{
                                            backgroundColor: "#2BD5A5", 
                                            height: "50px", 
                                            width: "180px", 
                                            fontFamily: 'Bitter', 
                                            fontStyle: "normal",
                                            fontWeight: "500", 
                                            fontSize: "15px"}}  >
                                    Почати
                                </Button>
                            </ThemeProvider>
                        </div>
                        <div style={{
                            paddingLeft: '20px', paddingRight: '10%', paddingTop: '30px'
                        }}>
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" 
                                        onClick={handleDone}
                                        style={{
                                            backgroundColor: "#8C74B5", 
                                            height: "50px", 
                                            width: "180px", 
                                            fontFamily: 'Bitter', 
                                            fontStyle: "normal",
                                            fontWeight: "500", 
                                            fontSize: "15px"}}  >
                                    Зупинити
                                </Button>
                            </ThemeProvider>
                        </div>
                </div>
            </div>
        </div>
    )
}
const DoAffine = async(Ax, Ay, Bx, By, Cx, Cy, vertex, angle, xScale, yScale) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let 
    x1 = Ax, 
    x2 = Bx, 
    x3 = Cx, 
    y1 = Ay, 
    y2 = By, 
    y3 = Cy;
    if(x1>15||x1<-15||y1>15||y1<-15||x2>15||x2<-15||y2>15||y2<-15||x3>15||x3<-15||y3>15||y3<-15){
        alert("Є ймовірність що трикутник вийде за межі поля. Введіть координати більші за -15 та менші за 15. ");
        return;
    }
    if(!checkTriangle(x1, y1, x2, y2, x3, y3)){
        alert("Координати введені неправильно. Це не трикутник");
        return;
    }

    isDone = false;
    var canvas = canvasRef.current;
    ctx = canvasRef.current.getContext('2d')

    let center = Math.round(canvas.width / 2);
    let coords = [[x1, y1, 1],
                  [x2, y2, 1],
                  [x3, y3, 1]];

    const sinAngle = Math.sin(Math.PI/180 *angle);
    const cosAngle = Math.cos(Math.PI/180 *angle);
    var turnMatrix = 
        [[cosAngle, sinAngle, 0],
        [sinAngle*(-1), cosAngle, 0],
        [0, 0, 1]];

    var m=0, n=0;
    
    if(vertex === "A"){
        console.log(coords[0][0]+": " + coords[0][1]);
        m = coords[0][0];
        n = coords[0][1];
    }else if(vertex === "B"){
        m = coords[1][0];
        n = coords[1][1];
    }else if(vertex === "C"){
        m = coords[2][0];
        n = coords[2][1];
    }
    var moveCordsSystem = 
        [[1, 0, 0],
        [0, 1, 0],
        [m*(-1), n*(-1), 1]];
    var moveCordsSystemBack = 
        [[1, 0, 0],
        [0, 1, 0],
        [m, n, 1]];

        var slayMatrix = MultiblyMatrix(moveCordsSystem, turnMatrix);
        slayMatrix = MultiblyMatrix(slayMatrix, moveCordsSystemBack);
    while(true){
        console.log(isDone);
        if(isDone){
            break;
        }
        if(xScale !== 0 && yScale !== 0){
            var scaleMatrix = 
            [[xScale, 0, 0],
            [0, yScale, 0],
            [0, 0, 1]];
            coords = MultiblyMatrix(coords, scaleMatrix);    
            var xDif, yDif
            if(vertex === 'A'){
                xDif = coords[0][0] - m;
                yDif = coords[0][1] - n;
            }else if(vertex === 'B'){
                xDif = coords[1][0] - m;
                yDif = coords[1][1] - n;
            }else if(vertex === 'C'){
                xDif = coords[2][0] - m;
                yDif = coords[2][1] - n;
            }
            coords = MultiblyMatrix(coords, [[1, 0, 0],
                [0, 1, 0],
                [-xDif, -yDif, 1]]);
        }
        coords = MultiblyMatrix(coords, slayMatrix);
        [x1, y1, x2, y2, x3, y3] = [coords[0][0], coords[0][1], coords[1][0], coords[1][1], coords[2][0], coords[2][1]];    

        x1 = center + x1*systemScale; x2 = center + x2*systemScale; x3 = center + x3*systemScale;
        y1 = center - y1*systemScale; y2 = center - y2*systemScale; y3 = center - y3*systemScale;

        const outCoord = (e) => e > 15 || e < -15;
        if (coords[0].some(outCoord) || coords[1].some(outCoord) || coords[2].some(outCoord)){
            //console.log('returned')
            break;
        }else if(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) < 3){
            break;
        }
        AfterDoneTriangle = [[(Math.floor(coords[0][0] * 100) / 100),(Math.floor(coords[0][1] * 100) / 100)],
                            [(Math.floor(coords[1][0] * 100) / 100),(Math.floor(coords[1][1] * 100) / 100)], 
                            [(Math.floor(coords[2][0] * 100) / 100), (Math.floor(coords[2][1] * 100) / 100)]];
                            console.log("after " + AfterDoneTriangle)
        //console.log(x1, y1, x2, y2, x3, y3)
        DrawBackground();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.stroke();   
        await delay(500);
    }
}
function DrawBackground(){
    var canvas= canvasRef.current;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var [width, height] = [canvas.width, canvas.height];
    var center = width/2; 
    ctx.fillStyle = "black";
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 0.5;
    let x = -15;
    let y = 15;
    var count = Math.round(width/(22));
    for(let i=0; i<count; i++){
        let step = i*22;        
        ctx.beginPath();
        ctx.moveTo(step, 0);
        ctx.lineTo(step, height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, step);
        ctx.lineTo(width, step);
        ctx.stroke(); 
        if(x===0){
            ctx.fillText(x, center+5, center+10);
        } else if(x>-15){
            ctx.font = '10px serif';
            ctx.fillText(x, step-5, center+10);
            ctx.fillText(y, center+5, step+3);
        }
        x++; y--;
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.moveTo(0, center);
    ctx.lineTo(width, center);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(center, 0);
    ctx.lineTo(center, height);
    ctx.stroke();
}

function MultiblyMatrix(a, b){
    var aRows = a.length, aCols = a[0].length,
        bRows = b.length, bCols = b[0].length,
        res = new Array(aRows);  // initialize array of rows
    for (var r = 0; r < aRows; ++r) {
        res[r] = new Array(bCols); // initialize the current row
        for (var c = 0; c < bCols; ++c) {
            res[r][c] = 0;            
            for (var i = 0; i < aCols; ++i) {
                res[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return res;
}

const checkTriangle = (x1, y1, x2, y2, x3, y3) => {

    // Calculation the area of
    // triangle. We have skipped
    // multiplication with 0.5
    // to avoid floating point
    // computations
    let a = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);

    // Condition to check if
    // area is not equal to 0
    if (a === 0)
        return false;
    else
        return true;
}