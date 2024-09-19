import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { faker } from '@faker-js/faker';

const generateFakeNews = (query, count = 10) => {
  return Array.from({ length: count }, () => ({
    title: `${query}: ${faker.lorem.sentence()}`,
    description: faker.lorem.paragraph(),
    url: faker.internet.url(),
    source: {
      name: faker.company.name()
    },
    publishedAt: faker.date.recent().toISOString()
  }));
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const searchAINews = async (query) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateFakeNews(query, 20);
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
