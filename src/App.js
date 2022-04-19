import React from 'react';
import './App.css';
import Search from './Components/Search';
import Table from './Components/Table';
import { Provider } from './StarWarsProvider';

function App() {
  return (
    <Provider>
      <Search />
      <Table />
    </Provider>
  );
}

export default App;
