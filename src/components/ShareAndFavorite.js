import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import '../styles/ShareAndFavorite.css';

export default function ShareAndFavorite({ recipe }) {
  const [id, image, name, type] = Object.keys(recipe)[0].includes('Meal')
    ? ['idMeal', 'strMealThumb', 'strMeal', 'comida']
    : ['idDrink', 'strDrinkThumb', 'strDrink', 'bebida'];

  const [isFavorite, setIsFavorite] = useState(false);
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);

  const favoriteRecipesStorage = JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  );
  const favoriteRecipes = favoriteRecipesStorage || [];
  const isItFavorite = favoriteRecipes.some((curr) => curr.id === recipe[id]);

  useEffect(() => {
    setIsFavorite(isItFavorite);
  }, [isItFavorite]);

  const handleFavorite = () => {
    const { strAlcoholic, strArea, strCategory } = recipe;

    const favoriteRecipe = {
      id: recipe[id],
      type,
      area: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: recipe[name],
      image: recipe[image],
    };

    let newFavoriteRecipes;

    if (isFavorite) {
      newFavoriteRecipes = favoriteRecipes.filter(
        (curr) => curr.id !== favoriteRecipe.id,
      );
      setIsFavorite(false);
    } else {
      newFavoriteRecipes = [...favoriteRecipes, favoriteRecipe];
      setIsFavorite(true);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  return (
    <div className="share-and-favorite">
      {showCopyToClipboard && <span className="share-text">Link copiado!</span>}
      <input
        alt="Share button"
        data-testid="share-btn"
        onClick={ () => {
          setShowCopyToClipboard(true);
          const url = window.location.href.split('/');
          copy(`${url[0]}//${url[2]}/${type}s/${recipe[id]}`);
        } }
        src={ shareIcon }
        type="image"
      />
      <input
        alt="Favorite button"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        type="image"
      />
    </div>
  );
}

ShareAndFavorite.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};
