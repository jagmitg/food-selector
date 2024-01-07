import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './style.css';
import FoodSelector from './FoodSelector';
import FoodHistory from './FoodHistory';
import FoodFrequency from './FoodFrequency';
import CustomFoodSelector from './CustomFoodSelector';

function App() {
  const [foods, setFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/foods.json')
      .then((response) => response.json())
      .then((data) => {
        setFoods(data.foods);
        setAllFoods(data.foods);
      });

    const storedHistory =
      JSON.parse(localStorage.getItem('selectedFoodHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const handleSelectFood = () => {
    if (foods.length === 0) {
      setFoods(allFoods);
    } else {
      const randomIndex = Math.floor(Math.random() * foods.length);
      const newSelectedFood = foods[randomIndex];
      const selectionTime = new Date().toLocaleString();

      setSelectedFood(newSelectedFood);

      const newHistory = [
        ...history,
        { name: newSelectedFood, timestamp: selectionTime },
      ];
      setHistory(newHistory);
      localStorage.setItem('selectedFoodHistory', JSON.stringify(newHistory));

      setFoods((prevFoods) =>
        prevFoods.filter((food) => food !== newSelectedFood)
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/history">Food History</Link>
            </li>
            <li>
              <Link to="/frequency">Food Frequency</Link>
            </li>
            <li>
              <Link to="/custom">Custom Food Selector</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <FoodSelector
                food={selectedFood}
                onSelectFood={handleSelectFood}
              />
            }
          />
          <Route path="/custom" element={<CustomFoodSelector />} />
          <Route path="/history" element={<FoodHistory history={history} />} />
          <Route
            path="/frequency"
            element={<FoodFrequency history={history} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
