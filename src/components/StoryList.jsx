import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTopStories } from '../utils/api';
import StoryItem from './StoryItem';
import { Skeleton } from "@/components/ui/skeleton";

const StoryList = () => {
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading stories: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <StoryItem key={story.objectID} story={story} />
      ))}
    </div>
  );
};

export default StoryList;