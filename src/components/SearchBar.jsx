import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsLoading(true);
      try {
        await queryClient.invalidateQueries(['stories']);
        onSearch(searchTerm);
        toast({
          title: "Search Initiated",
          description: `Searching for "${searchTerm}"`,
        });
      } catch (error) {
        toast({
          title: "Search Failed",
          description: "An unexpected error occurred. Please try again.",
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
        placeholder="Search stories..."
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
