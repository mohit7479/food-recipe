import React from 'react';
import Meal from './components/Meal'
import './components/style.css'
import { Route,Routes } from 'react-router-dom';
import RecipeInfo from './components/RecipeInfo.js';


function App() {
  return (
   <>
   <Routes>
    <Route path='/' element={<Meal/>}/>
    <Route path='/:MealId' element={<RecipeInfo/>} />
   </Routes>
   </>
   
  );
}

export default App;
