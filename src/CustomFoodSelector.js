import React, { useState, useEffect } from 'react';

const CustomFoodSelector = () => {
  const [activeTab, setActiveTab] = useState('create'); // For tab switching
  const [foodGroups, setFoodGroups] = useState({});
  const [editLabel, setEditLabel] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newFoods, setNewFoods] = useState('');
  const [selectedGroupLabel, setSelectedGroupLabel] = useState('');
  const [selectedCustomFood, setSelectedCustomFood] = useState('');
  const [foodSelectionCounts, setFoodSelectionCounts] = useState({});

  useEffect(() => {
    const storedFoodGroups =
      JSON.parse(localStorage.getItem('customFoodGroups')) || {};
    setFoodGroups(storedFoodGroups);
  }, []);

  useEffect(() => {
    const storedSelectionCounts =
      JSON.parse(localStorage.getItem('foodSelectionCounts')) || {};
    setFoodSelectionCounts(storedSelectionCounts);
  }, []);

  const handleNewLabelChange = (event) => {
    setNewLabel(event.target.value);
  };

  const handleNewFoodsChange = (event) => {
    setNewFoods(event.target.value);
  };

  const handleEditLabelChange = (event) => {
    setEditLabel(event.target.value);
  };

  const handleAddOrUpdateFoodGroup = () => {
    const label = editLabel || newLabel;
    if (newFoods.trim() && label.trim()) {
      const foods = newFoods
        .split(',')
        .map((food) => food.trim())
        .filter((food) => food);
      const updatedFoodGroups = {
        ...foodGroups,
        [label]: foods,
      };
      setFoodGroups(updatedFoodGroups);
      localStorage.setItem(
        'customFoodGroups',
        JSON.stringify(updatedFoodGroups)
      );
      setNewFoods(''); // Reset fields
      setNewLabel('');
      setEditLabel('');
    }
  };

  const handleGroupSelectionChange = (event) => {
    setSelectedGroupLabel(event.target.value);
    setEditLabel(event.target.value);
    setNewFoods(foodGroups[event.target.value].join(', '));
  };

  const handleGenerateCustomFood = () => {
    const selectedGroup = foodGroups[selectedGroupLabel];
    if (selectedGroup && selectedGroup.length > 0) {
      const randomIndex = Math.floor(Math.random() * selectedGroup.length);
      const food = selectedGroup[randomIndex];
      setSelectedCustomFood(food);

      const updatedCounts = { ...foodSelectionCounts };
      if (!updatedCounts[selectedGroupLabel]) {
        updatedCounts[selectedGroupLabel] = {};
      }
      if (!updatedCounts[selectedGroupLabel][food]) {
        updatedCounts[selectedGroupLabel][food] = 0;
      }
      updatedCounts[selectedGroupLabel][food] += 1;
      setFoodSelectionCounts(updatedCounts);
      localStorage.setItem(
        'foodSelectionCounts',
        JSON.stringify(updatedCounts)
      );
    }
  };

  return (
    <div>
      <h1>Custom Food Selector</h1>

      <div>
        <button
          className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create/Edit Group
        </button>
        <button
          className={`tab-btn ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate Food
        </button>
        <button
          className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Food Group Stats
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'create' && (
        <div>
          <h2>Create or Edit Food Group</h2>
          <div>
            <input
              type="text"
              className="text-input"
              value={newLabel}
              onChange={handleNewLabelChange}
              placeholder="New label or select existing to edit"
            />
          </div>
          <div>
            <textarea
              className="text-area"
              value={newFoods}
              onChange={handleNewFoodsChange}
              placeholder="Enter custom foods separated by commas"
            />
          </div>
          <div>
            <button onClick={handleAddOrUpdateFoodGroup}>
              Save Food Group
            </button>
          </div>
        </div>
      )}

      {activeTab === 'generate' && (
        <div>
          <h2>Select a Food Group to Generate</h2>
          <select
            className="select-dropdown"
            value={selectedGroupLabel}
            onChange={handleGroupSelectionChange}
          >
            <option value="">Select a group</option>
            {Object.keys(foodGroups).map((groupLabel) => (
              <option key={groupLabel} value={groupLabel}>
                {groupLabel}
              </option>
            ))}
          </select>
          <button
            onClick={handleGenerateCustomFood}
            disabled={!selectedGroupLabel}
          >
            Generate Random Food
          </button>
          <div>
            {selectedCustomFood && <p>Generated Food: {selectedCustomFood}</p>}
          </div>
        </div>
      )}
      {activeTab === 'stats' && (
        <div>
          <h2>Food Group Stats</h2>
          {Object.entries(foodSelectionCounts).map(([groupLabel, counts]) => (
            <div key={groupLabel}>
              <h3>{groupLabel}</h3>
              <ul>
                {Object.entries(counts).map(([food, count]) => (
                  <li key={food}>
                    {food}: {count} times
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomFoodSelector;
