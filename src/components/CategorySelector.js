import React, { useState, useEffect } from 'react';

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulating fetching categories from an API
    getAllCategories()
      .then(categoriesFromApi => {
        setCategories(categoriesFromApi);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        // Handle error as needed
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleSelectChange = (e) => {
    onCategoryChange(e.target.value);
  };

  const getAllCategories = async () => {
    // Replace this with actual API call to fetch categories
    // Example using fetch:
    
    let url = `${process.env.REACT_APP_API_BASE_URL}/shops/categories`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.data; // Assuming the API response returns categories as an array
  };

  return (
    <div>
      <label>Select Category:</label>
      <select value={selectedCategory} onChange={handleSelectChange}>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
