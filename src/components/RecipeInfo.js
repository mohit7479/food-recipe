import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeInfo = () => {
  const { MealId } = useParams();
  const [item, setItem] = useState();
  const [vId, setVId] = useState("");

  useEffect(() => {
    console.log("Fetching recipe for MealId:", MealId);
  
    if (MealId !== "") {
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
        .then((response) => {
          console.log("API Response:", response.data);
          const meal = response.data.meals ? response.data.meals[0] : null;
          setItem(meal);
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
        });
    }
  }, [MealId]);
  

  useEffect(() => {
    if (item) {
      const url = item.strYoutube;
      const str = url.split("=");
      const videoId = str[str.length - 1];
      setVId(videoId);
    }
  }, [item]);

  return (
    <>
      {!item ? (
        ""
      ) : (
        <>
          <div className="content">
            <img src={item.strMealThumb} alt="" />
            <div className="inner-content">
              <h1>{item.strMeal}</h1>
              <h2>{item.strArea} Food</h2>
              <h2>Category: {item.strCategory}</h2>
            </div>
          </div>
          <div className="recipe-details">
            <div className="ingredients">
              <h4>Ingredients :</h4>
              <ul>
                <li>
                  {item.strIngredient1}:{item.strMeasure1}
                </li>
                <li>
                  {item.strIngredient2}:{item.strMeasure2}
                </li>
                <li>
                  {item.strIngredient3}:{item.strMeasure3}
                </li>
                <li>
                  {item.strIngredient4}:{item.strMeasure4}
                </li>
                <li>
                  {item.strIngredient5}:{item.strMeasure5}
                </li>
                {item.strIngredient6 && (
                  <li>
                    {item.strIngredient6}: {item.strMeasure6}
                  </li>
                )}
                {item.strIngredient7 && (
                  <li>
                    {item.strIngredient7}: {item.strMeasure7}
                  </li>
                )}
              </ul>
            </div>
            <div className="instruction">
              <h3>Instructions:</h3>
              <h5>{item.strInstructions}</h5>
            </div>
            <div className="more-details">
              <button
                onClick={() =>
                  window.open(`https://www.youtube.com/watch?v=${vId}`, "_blank")
                }
              >
                Watch Video
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RecipeInfo;
