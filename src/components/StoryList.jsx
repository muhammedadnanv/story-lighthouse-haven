import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryItem from './StoryItem';
import { Skeleton } from "@/components/ui/skeleton";
import { mockStories } from '../data/mockStories';

const fetchMockStories = async (searchTerm) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!searchTerm) return mockStories;
  
  return mockStories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.snippet.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const StoryList = ({ searchTerm }) => {
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['stories', searchTerm],
    queryFn: () => fetchMockStories(searchTerm),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading results: {error.message}</div>;
  }

  if (!stories || stories.length === 0) {
    return <div className="text-gray-500">No results found. Try searching for something else!</div>;
  }

  return (
    <div className="space-y-4">
      {stories.map((story, index) => (
        <StoryItem key={index} story={story} />
      ))}
    </div>
  );
};

export default StoryList;
