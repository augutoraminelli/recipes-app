import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';

import SearchRadio from './SearchRadio';
import RecipesContext from '../context/RecipesContext';
import methods from '../services/api';

import '../styles/SearchBar.css';

const { searchBy } = methods;
const SEARCH_RADIO_OPTIONS = [
  {
    id: 'ingredient',
    label: 'Ingredient',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'first-letter',
    label: 'First letter',
  },
];

export default function SearchBar() {
  const { setRecipes } = useContext(RecipesContext);

  const history = useHistory();
  const { pathname } = history.location;

  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');

  const [recipeId, recipeType] = pathname === '/comidas'
    ? ['idMeal', 'meals'] : ['idDrink', 'drinks'];

  const fetchData = async (type) => {
    const response = await searchBy[type](recipeType, searchInput);

    if (!response[recipeType]) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }

    if (response[recipeType].length === 1) {
      return history.push(`${pathname}/${response[recipeType][0][recipeId]}`);
    }

    return setRecipes(response[recipeType]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (searchRadio) {
    case 'ingredient':
      fetchData('ingredient');
      break;
    case 'name':
      fetchData('name');
      break;
    case 'first-letter':
      if (searchInput.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
        // alert when search input is more than 1 character
      }
      fetchData('firstLetter');
      break;
    default:
      break;
    }
  };

  return (
    <form className="search-bar" onSubmit={ handleSubmit }>
      <input
        className="search-bar-input"
        data-testid="search-input"
        onChange={ ({ target }) => setSearchInput(target.value) }
        placeholder="Search Recipe"
        type="text"
        value={ searchInput }
      />
      <div className="search-radio-container">
        {SEARCH_RADIO_OPTIONS.map(({ label, id }) => (
          <SearchRadio
            key={ id }
            checked={ searchRadio === id }
            id={ id }
            label={ label }
            name="search-radio"
            onChange={ ({ target }) => setSearchRadio(target.value) }
          />
        ))}
      </div>
      <button
        className="search-bar-button"
        data-testid="exec-search-btn"
        disabled={ !searchInput || !searchRadio }
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
