const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/';
const COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const fetchData = async (api) => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const api = {
  meals: (endpoint) => fetchData(`${MEAL_API_URL}${endpoint}`),
  // Reference: https://www.themealdb.com/api.php

  drinks: (endpoint) => fetchData(`${COCKTAIL_API_URL}${endpoint}`),
  // Reference: https://www.thecocktaildb.com/api.php
};

const methods = {
  filterBy: {
    area: (area) => api.meals(`filter.php?a=${area}`),
    category: (key, category) => api[key](`filter.php?c=${category}`),
  },

  listAll: {
    areas: () => api.meals('list.php?a=list'),
    categories: (key) => api[key]('list.php?c=list'),
    ingredients: (key) => api[key]('list.php?i=list'),
  },

  lookup: {
    details: (key, id) => api[key](`lookup.php?i=${id}`),
    random: (key) => api[key]('random.php'),
  },

  searchBy: {
    ingredient: (key, ingredient) => api[key](`filter.php?i=${ingredient}`),
    name: (key, name) => api[key](`search.php?s=${name || ''}`),
    // fetch initial recipes and recomendations from www.themealdb.com/api/json/v1/1/search.php?s=
    firstLetter: (key, letter) => api[key](`search.php?f=${letter}`),
  },
};

export default methods;

// export const fetchIngredientesListCocktails = async (strIngredient1) => {
//   const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient1}`);
//   const { drinks } = await response.json();
//   return drinks;
// };

// export const fetchIngredientesListMeal = async (strIngredient) => {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`);
//   const { meals } = await response.json();
//   return meals;
// };
