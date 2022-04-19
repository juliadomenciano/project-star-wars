import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

function StarWarsProvider({ children }) {
  const [data, setData] = useState({
    data: [],
  });

  const [filterByName, setFilterByName] = useState({
    name: '',
  });

  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filteredData, setFilteredData] = useState({
    newData: [],
    filter: false,
  });

  const fetchData = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const result = await response.json();
    console.log(result.results);
    setData({
      data: result.results,
    });
  };

  const handleChange = (e) => {
    setFilterByName({
      name: e.target.value });
  };

  const handleFilter = (e) => {
    const { target } = e;
    setFilterByNumericValues({
      ...filterByNumericValues,
      [target.name]: target.value });
  };

  const handleButtonFilter = (column, comparison, value) => {
    setFilteredData({
      newData: [column, comparison, value],
      filter: true,
    });
  };

  const context = {
    ...data,
    fetchData,
    ...filterByName,
    handleChange,
    ...filterByNumericValues,
    handleFilter,
    ...filteredData,
    handleButtonFilter,
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
