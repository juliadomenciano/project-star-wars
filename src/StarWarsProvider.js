import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

const Context = createContext();
export const sortingType = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  const [filterByName, setFilterByName] = useState({
    name: '',
  });

  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [options, setOptions] = useState(sortingType);

  const fetchData = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const result = await response.json();
    setData(result.results);
    const sorted = result.results.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase());
    console.log(sorted);
    setFilteredPlanets(sorted);
  };

  const handleChange = (e) => {
    setFilterByName({
      name: e.target.value });
    const dataByName = data.filter((item) => item.name.includes(e.target.value));
    setFilteredPlanets(dataByName);
  };

  const handleOrder = (e) => {
    const { target } = e;
    setOrder({
      ...order,
      [target.name]: target.value,
    });
  };

  const comparisonFilter = (comparison, a, b) => {
    if (comparison === 'igual a') {
      return a === b;
    }
    if (comparison === 'menor que') {
      return a < b;
    }
    if (comparison === 'maior que') {
      return a > b;
    }
  };

  const verifyData = () => {
    if (filterByNumericValues.length) {
      const filteredData = data
        .filter((item) => filterByNumericValues
          .every(({ column, value, comparison }) => comparisonFilter(comparison,
            Number(item[column]), Number(value))))
        .filter((item) => item.name.includes(filterByName.name));

      setFilteredPlanets(filteredData);
    } else {
      setFilteredPlanets(data);
    }
  };

  const handleFilter = (e) => {
    const { target } = e;
    setFilters({
      ...filters,
      [target.name]: target.value });
  };

  const handleButtonFilter = () => {
    const { comparison, column, value } = filters;
    setFilterByNumericValues([...filterByNumericValues, { comparison, column, value }]);

    const filterOptions = options.filter((item) => item !== column);
    setFilters({ ...filters, column: options[1] });
    setOptions(filterOptions);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { verifyData(); }, [filterByNumericValues]);

  const removeFilters = (column) => {
    if (filterByNumericValues.length) {
      setOptions([...options, column]);
      setFilterByNumericValues(filterByNumericValues
        .filter((item) => item.column !== column));
      console.log('removeu');
    } else {
      setFilteredPlanets(data);
    }
  };

  const removeAllFilters = () => {
    setOptions(sortingType);
    setFilterByNumericValues([]);
    setFilteredPlanets(data);
  };

  const sortTable = () => {
    const { sort, column } = order;
    const unknown = filteredPlanets.filter((item) => item.population === 'unknown');
    const sorting = filteredPlanets.filter((item) => item.population !== 'unknown');
    if (sort === 'ASC') {
      if (column === 'population') {
        const ascSorting = sorting.sort((a, b) => a[column] - b[column]);
        setFilteredPlanets([...ascSorting, ...unknown]);
      } else {
        const ascSorting = filteredPlanets.sort((a, b) => a[column] - b[column]);
        setFilteredPlanets([...ascSorting]);
      }
    }
    if (sort === 'DESC') {
      if (column === 'population') {
        const dscSorting = sorting.sort((a, b) => b[column] - a[column]);
        setFilteredPlanets([...dscSorting, ...unknown]);
      } else {
        const dscSorting = filteredPlanets.sort((a, b) => b[column] - a[column]);
        setFilteredPlanets([...dscSorting]);
      }
    }
  };

  const context = {
    data,
    fetchData,
    ...filterByName,
    handleChange,
    filteredPlanets,
    handleFilter,
    handleButtonFilter,
    filterByNumericValues,
    options,
    removeFilters,
    removeAllFilters,
    handleOrder,
    order,
    sortTable,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}
StarWarsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export { Context, StarWarsProvider as Provider };
