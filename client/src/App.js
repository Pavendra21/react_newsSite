import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NewsDisplay from './Components/Home';

function App() {
  const [category, setCategory] = useState('general');

  return (
    <Router>
      <Navbar onCategoryChange={setCategory} />
      <Routes>
        <Route path="/:category" element={<NewsDisplay />} />
        <Route path="/" element={<NewsDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
