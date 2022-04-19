import React, { useContext, useEffect } from 'react';
import { Context } from '../StarWarsProvider';

function Table() {
  const {
    data, fetchData, name, filter, newData, comparison, column, value,
  } = useContext(Context);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchData(); }, []);

  return (

    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravaty</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { !filter
             && data.filter((item) => item.name.includes(name)).map((item) => (
               <tr key={ item.name }>
                 <td>{item.name}</td>
                 <td>{item.rotation_period}</td>
                 <td>{item.orbital_period}</td>
                 <td>{item.diameter}</td>
                 <td>{item.climate}</td>
                 <td>{item.gravity}</td>
                 <td>{item.terrain}</td>
                 <td>{item.surface_water}</td>
                 <td>{item.population}</td>
                 <td>{item.films}</td>
                 <td>{item.created}</td>
                 <td>{item.edited}</td>
                 <td>{item.url}</td>
               </tr>
             ))}

          { (filter && comparison === 'igual a')
            && data.filter((item) => item.name.includes(name))
              .filter((item) => item[column] === value)
              .map((item) => (
                <tr key={ item.name }>
                  <td>{item.name}</td>
                  <td>{item.rotation_period}</td>
                  <td>{item.orbital_period}</td>
                  <td>{item.diameter}</td>
                  <td>{item.climate}</td>
                  <td>{item.gravity}</td>
                  <td>{item.terrain}</td>
                  <td>{item.surface_water}</td>
                  <td>{item.population}</td>
                  <td>{item.films}</td>
                  <td>{item.created}</td>
                  <td>{item.edited}</td>
                  <td>{item.url}</td>
                </tr>
              ))}

          { (filter && comparison === 'menor que')
            && data.filter((item) => item.name.includes(name))
              .filter((item) => item[column] <= value).map((item) => (
                <tr key={ item.population }>
                  <td>{item.name}</td>
                  <td>{item.rotation_period}</td>
                  <td>{item.orbital_period}</td>
                  <td>{item.diameter}</td>
                  <td>{item.climate}</td>
                  <td>{item.gravity}</td>
                  <td>{item.terrain}</td>
                  <td>{item.surface_water}</td>
                  <td>{item.population}</td>
                  <td>{item.films}</td>
                  <td>{item.created}</td>
                  <td>{item.edited}</td>
                  <td>{item.url}</td>
                </tr>
              ))}

          { (filter && newData[1] === 'maior que')
            && data.filter((item) => item.name.includes(name))
              .filter((item) => item[column] > Number(value))
              .map((item) => (
                <tr key={ item.diameter }>
                  <td>{item.name}</td>
                  <td>{item.rotation_period}</td>
                  <td>{item.orbital_period}</td>
                  <td>{item.diameter}</td>
                  <td>{item.climate}</td>
                  <td>{item.gravity}</td>
                  <td>{item.terrain}</td>
                  <td>{item.surface_water}</td>
                  <td>{item.population}</td>
                  <td>{item.films}</td>
                  <td>{item.created}</td>
                  <td>{item.edited}</td>
                  <td>{item.url}</td>
                </tr>
              ))}

        </tbody>
      </table>

    </section>

  );
}

export default Table;
