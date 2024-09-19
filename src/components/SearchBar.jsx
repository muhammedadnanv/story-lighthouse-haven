import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config/api';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const searchAINews = async (query) => {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: `${query} AND artificial intelligence`,
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: 20,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
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
