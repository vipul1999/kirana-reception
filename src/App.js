
import './App.css'; // Your app-specific CSS
import ShopList from './components/ShopList';
import ShopInventory from './components/shopInventory/ShopInventory'; // Import your target component
import CategorySelector from './components/CategorySelector';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Routes, Route,Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
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

    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">LocalKirana</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Address</Nav.Link>
              <Nav.Link as={Link} to="/shops">SearchBarHere</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    <CategorySelector selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
    <Routes>
        {/* Define route for the main shop list */}
        <Route path="/" element={<ShopList selectedCategory={selectedCategory} />} />
        
        {/* Define route for ShopInventory based on shop ID */}
        <Route path="/shop/:id/inventory" element={<ShopInventory />} />
      </Routes>
  </div>
); 
}
export default App;