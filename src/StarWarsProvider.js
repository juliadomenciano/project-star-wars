import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();
export const sortingType = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  const [filterByName, setFilterByName] = useState({
    name: '',
  });

  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const zero = 0;
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: zero,
  });

  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const [filters, setFilters] = useState([]);
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
    const { comparison, column, value } = filterByNumericValues;
    const { name } = filterByName;

    if (filteredPlanets && comparison === 'igual a') {
      const filteredData = filteredPlanets.filter((item) => item[column] === value)
        .filter((item) => item.name.includes(name));

      setFilteredPlanets(filteredData);
    }
    if (filteredPlanets && comparison === 'menor que') {
      const filteredData = filteredPlanets.filter((item) => item[column] < Number(value))
        .filter((item) => item.name.includes(name));

      setFilteredPlanets(filteredData);
    }
    if (filteredPlanets && comparison === 'maior que') {
      const filteredData = filteredPlanets.filter((item) => item[column] > Number(value))
        .filter((item) => item.name.includes(name));

      setFilteredPlanets(filteredData);
    }
  };

  const handleFilter = (e) => {
    const { target } = e;
    setFilterByNumericValues({
      ...filterByNumericValues,
      [target.name]: target.value });
  };

  const handleButtonFilter = () => {
    const { comparison, column, value } = filterByNumericValues;
    setFilters([...filters, { comparison, column, value }]);
    verifyData();
    const filterOptions = options.filter((item) => item !== column);
    setOptions(filterOptions);
    setFilterByNumericValues({ ...filterByNumericValues, column: options[0] });
  };

  const removeFilters = (e) => {
    const addOptions = e.target.name;
    if (addOptions) {
      e.target.parentNode.remove();
      setOptions([...options, addOptions]);
      setFilters([]);
    } else {
      setFilters([]);
      setOptions(sortingType);
    }
    setFilteredPlanets(data);
  };

  const sortTable = () => {
    const { sort, column } = order;
    if (sort === 'ASC') {
      const sorting = filteredPlanets.sort((a, b) => b[column] - a[column]);
      setFilteredPlanets(sorting);
    }
    if (sort === 'DESC') {
      const sorting = filteredPlanets.sort((a, b) => a[column] - b[column]);
      setFilteredPlanets(sorting);
    }
    console.log(filteredPlanets);
  };

  const context = {
    data,
    fetchData,
    ...filterByName,
    handleChange,
    filteredPlanets,
    handleFilter,
    handleButtonFilter,
    filters,
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
