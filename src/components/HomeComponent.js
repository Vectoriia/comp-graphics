import * as React from 'react';
import '../index.css';
import Fractal from '../img/fractalCard.jpeg';
import Colors from '../img/colorsCard.png';
import Affine from '../img/affineCard.png';
import { display } from '@mui/system';
import {useNavigate} from 'react-router-dom';

export default function Home (){
    const navigation = useNavigate();
    const goTo = (e, location) => {
        e.preventDefault();
        navigation(location);
        console.log("here");
    
    } 

    return(  
        <div className='container'> 
            <div className="square">
                    <h1 className="header" style={{paddingTop: "25px"}}>Вивчай комп’ютерну графіку</h1>
                    <p className="text">Комп’ютерна графіка – дуже обширна галузь комп’ютерних знань, 
                        яка пройшла розвиток як складна наукова дисципліна. Сучасна КГ визначається багатьма напрямками і 
                        різноманітними застосуваннями. Для одних з них, наприклад, основою є автоматизація креслення технічної 
                        документації, для інших - проблеми оперативної взаємодії людини і комп'ютера</p>
            </div>
            <div className="card-container">  
                <div className="overlay-container"  onClick={e => goTo(e, "/fractals")}>  
                    <img className="card" src = {Fractal} draggable = {false}/>
                    <div className="overlay" draggable = {false}>
                        У цьому розділі ви зможете створити та модифікувати T-фрактал та льодовий фрактал. 
                                                     Ці зображення вражають різноманіттістю форм та надзвичайною красою.
                    </div>
                    <div className="overlay-header" draggable = {false}>
                        <div className="header-1">Фрактали</div>
                    </div>
                </div>
                <div className="overlay-container" onClick={e => goTo(e, "/colorings")}>  
                    <img className="card" src = {Colors} draggable = {false}/>
                    <div className="overlay" draggable = {false}>
                       У цьому розділі ви зомжете перевести  колірну схему зображення з адаптивної 
                                                     моделі RGB в модель HSV та змінити насиченість по зеленому кольору.
                    </div>
                    <div className="overlay-header" draggable = {false}>
                        <div className="header-2">Колірні схеми</div>
                    </div>
                </div>
                <div className="overlay-container">  
                    <img className="card" src = {Affine} draggable = {false}/>
                    <div className="overlay" draggable = {false}>
                        У цьому розділі ви познайомитесь з афінними перетвореннями та на прикладі 
                                                     трикутника зможете провести операції руху, повороту та масштабування.
                    </div>
                    <div className="overlay-header" draggable = {false}>
                        <div className="header-3">Рухомі зображення</div>
                    </div>
                </div>
            </div>
        </div>
            
    );
}
