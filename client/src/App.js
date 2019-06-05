import React from 'react';
import ProductSearch from './SearchBar/ProductSearch/ProductSearch';
import UserDashboard from './UserDashboard';
import NavigationBar from './NavigationBar/NavigationBar';
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
