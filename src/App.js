
import './App.css'; // Your app-specific CSS
import ShopList from './components/ShopList';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategorySelector from './components/CategorySelector';
import React, { useState } from 'react';

// App.js or equivalent
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

return (
  <div className="App">
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <CategorySelector selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
    <ShopList selectedCategory={selectedCategory} />
  </div>
); 
}
export default App;