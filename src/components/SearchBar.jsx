import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
import { API_KEY, SEARCH_ENGINE_ID, BASE_URL } from '../config/api';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const searchGoogle = async (query) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          cx: SEARCH_ENGINE_ID,
          q: query,
          num: 10,
        },
      });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(`Error ${error.response.status}: ${error.response.data.error.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from the server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up the request. Please try again.');
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsLoading(true);
      try {
        const results = await searchGoogle(searchTerm);
        queryClient.setQueryData(['googleResults'], results);
        toast({
          title: "Search Successful",
          description: `Found ${results.length} results for "${searchTerm}"`,
        });
      } catch (error) {
        toast({
          title: "Search Failed",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-8 flex gap-2">
      <Input
        type="text"
        placeholder="Search Google..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
};

export default SearchBar;
