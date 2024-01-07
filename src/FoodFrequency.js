import React from 'react';

const FoodFrequency = ({ history }) => {
  const frequency = history.reduce((acc, curr) => {
    acc[curr.name] = (acc[curr.name] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1>Food Selection Frequency</h1>
      <table>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Times Selected</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(frequency).map(([food, count], index) => (
            <tr key={index}>
              <td>{food}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodFrequency;
