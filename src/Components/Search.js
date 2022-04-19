import React, { useContext } from 'react';
import { Context } from '../StarWarsProvider';

function Search() {
  const {
    name, handleChange, value, comparison, column, handleFilter, handleButtonFilter,
  } = useContext(Context);

  /* useEffect(() => {}, [column, comparison, value]); */

  return (

    <section>
      <form>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="name-filter"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="column">
          <select
            name="column"
            value={ column }
            data-testid="column-filter"
            onChange={ handleFilter }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            name="comparison"
            value={ comparison }
            data-testid="comparison-filter"
            onChange={ handleFilter }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-filter"
            onChange={ handleFilter }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => handleButtonFilter(column, comparison, value) }
        >
          Filtrar

        </button>
      </form>
    </section>

  );
}

export default Search;
