import React from 'react';

const FoodHistory = ({ history }) => {
  return (
    <div>
      <h1>History of Selected Foods</h1>
      <table>
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Selected On</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodHistory;
