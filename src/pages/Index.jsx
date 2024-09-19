import React, { useState } from 'react';
import StoryList from '../components/StoryList';
import SearchBar from '../components/SearchBar';
import AuthButtons from '../components/AuthButtons';
import Footer from '../components/Footer';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">ZeroKoptheer</h1>
          <h2 className="text-2xl font-semibold mb-4 text-center">Story Search</h2>
          <SearchBar onSearch={handleSearch} />
          <StoryList searchTerm={searchTerm} />
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Login or Sign Up</h3>
            <AuthButtons />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
