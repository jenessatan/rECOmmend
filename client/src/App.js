import React from 'react';
import ProductSearch from './Components/SearchBar/ProductSearch/ProductSearch';
import UserDashboard from './Components/UserDashboard';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import './App.css';

function App() {
  return (
    <div className="App">
        <NavigationBar/>
        <div className="productSearch-container">
            <ProductSearch/>
        </div>
        <UserDashboard/>
    </div>
  );
}

export default App;
