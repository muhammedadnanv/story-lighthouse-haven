import React from 'react';
import StoryList from '../components/StoryList';
import SearchBar from '../components/SearchBar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">ZeroKoptheer</h1>
        <SearchBar />
        <StoryList />
      </div>
    </div>
  );
};

export default Index;
