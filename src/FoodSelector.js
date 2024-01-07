import React from 'react';

const FoodSelector = ({ food, onSelectFood }) => {
  return (
    <div>
      <h1>What to eat?</h1>
      <h2>{food || "Click 'Generate' to find out!"}</h2>
      <button onClick={onSelectFood}>Generate</button>
    </div>
  );
};

export default FoodSelector;
