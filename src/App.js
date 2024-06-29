import React from 'react';
import './App.css'; // Your app-specific CSS
import ShopList from './components/ShopList';
import 'bootstrap/dist/css/bootstrap.min.css';

// App.js or equivalent
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <ShopList />
    </div>
  );
}

export default App;