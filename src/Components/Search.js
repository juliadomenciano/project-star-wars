import React, { useContext } from 'react';
import { Context, sortingType } from '../StarWarsProvider';

function Search() {
  const {
    name, handleChange, comparison, column, handleFilter, handleButtonFilter,
    filterByNumericValues, options, removeFilters, handleOrder, order, sortTable, value,
  } = useContext(Context);

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
            {
              options.map((item, index) => (
                <option key={ `${item.column}-${index}` } value={ item }>{ item }</option>
              ))
            }
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
            placeholder={ 0 }
            data-testid="value-filter"
            onChange={ handleFilter }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleButtonFilter }
        >
          Filtrar

        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeFilters }
        >
          Remover todas filtragens

        </button>
      </form>
      {filterByNumericValues !== []
        && filterByNumericValues.map((item, index) => (
          <div
            key={ `${index}-${item.value} ` }
            data-testid="filter"
          >
            <span>{`${item.column} ${item.comparison} ${item.value}`}</span>
            <button
              type="button"
              name={ item.column }
              onClick={ () => { removeFilters(column); } }
            >
              x
            </button>
          </div>
        ))}

      <div />
      <div>
        <label htmlFor="column">
          <p>ordenar por:</p>
          <select
            name="column"
            value={ order.column }
            data-testid="column-sort"
            onChange={ handleOrder }
          >
            {
              sortingType.map((item, index) => (
                <option key={ `${item}-${index}` } value={ item }>{ item }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="sort">
          Ascendente:
          <input
            type="radio"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleOrder }
          />
        </label>
        <label htmlFor="sort">
          descendente:
          <input
            type="radio"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handleOrder }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ sortTable }
        >
          Ordenar
        </button>
      </div>
    </section>

  );
}

export default Search;
