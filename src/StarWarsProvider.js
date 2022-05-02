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
    column: 'population',
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
    setFilteredPlanets(result.results);
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

  const verifyData = () => {
    const { comparison } = filters;

    if (comparison === 'igual a') {
      const filteredData = data
        .filter((item) => filterByNumericValues
          .every(({ column, value }) => item[column] === value));

      setFilteredPlanets(filteredData);
      console.log('0');
    }
    if (comparison === 'menor que') {
      const filteredData = data
        .filter((item) => filterByNumericValues
          .every(({ column, value }) => item[column] < Number(value)));

      setFilteredPlanets(filteredData);
      console.log('1');
    }
    if (comparison === 'maior que') {
      const filteredData = data
        .filter((item) => filterByNumericValues
          .every(({ column, value }) => item[column] > Number(value)));

      setFilteredPlanets(filteredData);
      console.log('2');
    }
    console.log(filterByNumericValues);
    console.log(filteredPlanets);
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
    setFilters({ ...filters, column: options[0] });
    setOptions(filterOptions);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { verifyData(); }, [filterByNumericValues]);

  const removeFilters = (column) => {
    if (column) {
      setOptions([...options, column]);
      setFilterByNumericValues(filterByNumericValues
        .filter((item) => item.column !== column));
      console.log('removeu');
    } else {
      setFilteredPlanets(data);
    }
  };

  const sortTable = () => {
    const { sort, column } = order;
    if (sort === 'ASC') {
      const sorting = filteredPlanets.sort((a, b) => a[column] - b[column]);
      setFilteredPlanets([...sorting]);
      console.log(sorting);
    }
    if (sort === 'DESC') {
      const sorting = filteredPlanets.sort((a, b) => b[column] - a[column]);
      setFilteredPlanets([...sorting]);
      console.log(sorting);
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

export default StarWarsProvider;
export { Context, StarWarsProvider as Provider };
