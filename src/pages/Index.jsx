import React, { useState } from 'react';
import StoryList from '../components/StoryList';
import SearchBar from '../components/SearchBar';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">ZeroKoptheer</h1>
        <h2 className="text-2xl font-semibold mb-4 text-center">Story Search</h2>
        <SearchBar onSearch={handleSearch} />
        <StoryList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Index;
