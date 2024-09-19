import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = 'YOUR_NEWS_API_KEY'; // Replace with your actual News API key

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const searchAINews = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: `${query} AND (artificial intelligence) AND (developer OR programming)`,
          sortBy: 'publishedAt',
          language: 'en',
          pageSize: 100,
          apiKey: API_KEY,
        },
      });
      return response.data.articles || [];
    } catch (error) {
      console.error('Error searching AI news:', error);
      return [];
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const results = await searchAINews(searchTerm);
      queryClient.setQueryData(['latestAINews'], results);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-8 flex gap-2">
      <Input
        type="text"
        placeholder="Search AI news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;
