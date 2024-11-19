import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onCategoryChange }) => {
  const categories = ['general', 'world', 'business', 'sports', 'technology'];

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-lg font-semibold">
          <Link to="/">The Daily Bugle</Link>
        </div>

        {/* Category Links */}
        <div className="flex space-x-4 text-white">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/${category}`}
              onClick={() => onCategoryChange(category)}
              className="hover:text-gray-300"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
