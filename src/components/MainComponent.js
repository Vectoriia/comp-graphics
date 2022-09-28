import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from "./HomeComponent.js"
import Info from "./InfoComponent.js"
import Fractal from "./FractalComponent.js"

import Box from '@mui/material/Box';
import Drawer from './Drawer';
import { styled, useTheme } from '@mui/material/styles';
export default function Main (){

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));

        return (
            <>
                <Box sx={{ display: 'flex' }}>
                    <BrowserRouter>
                        <Drawer/>
                        <Box component="main">
                            <DrawerHeader />
                            <Routes >
                                <Route  path="/home" element={<Home/>} />
                                <Route  path="/fractals" element={<Fractal/>}/>
                                <Route exact path="/info" element={<Info/>}/>
                                <Route path="*" element={ <Home/> }/>
                            </Routes >        
                        </Box>
                    </BrowserRouter>
                </Box>
            </>
        );

    

}
