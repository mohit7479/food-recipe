import React, { useEffect, useState } from 'react';
import MealItem from './MealItem';
import RecipeIndex from './RecipeIndex';
import axios from 'axios';

const Meal = () => {
  const [url, setUrl] = useState("https://www.themealdb.com/api/json/v1/1/search.php?s=a");
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        if (!response.data.meals) {
          setShow(false);
          return;
        }

        setItem(response.data.meals);
        setShow(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setShow(false);
      }
    };

    fetchData();
  }, [url]);
  

  const setIndex = (alpha) => {
    setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`);
  }

  const searchRecipe = (evt) => {
    if (evt.key === "Enter") {
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    }
  }

  return (
    <>
      <div className='main'>
        <div className='heading'>
          <h1>Search Your Food Recipe</h1>
          <h4>
            Explore a world of culinary delights with our Food Recipe React App.
            Discover mouth-watering recipes from various cuisines right at your fingertips.
            Dive into a vast collection of easy-to-follow recipes for every skill level.
            From quick and simple dishes to gourmet creations, find the perfect recipe to suit your taste.
            Personalize your cooking experience by saving your favorite recipes and creating shopping lists.
            Our user-friendly interface makes it a breeze to navigate and enjoy the cooking process.
            Whether you're a seasoned chef or a kitchen beginner, our Food Recipe React App is your go-to companion
            for creating delicious meals that will impress family and friends.
            Join our community of food enthusiasts, share your culinary creations, and get inspired by others.
            Happy cooking!
          </h4>
        </div>
        <div className='search-box'>
          <input type='search' className='search-bar' onChange={(e) => setSearch(e.target.value)} onKeyPress={searchRecipe} />
        </div>
        <div className='container'>
          {show ? <MealItem data={item} /> : 'No results found'}
        </div>
        <div className='indexContainer'>
          <RecipeIndex alphaIndex={(alpha) => setIndex(alpha)} />
        </div>
      </div>
    </>
  );
}

export default Meal;
