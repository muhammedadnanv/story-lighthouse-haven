import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryItem from './StoryItem';
import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios';
import { API_KEY, SEARCH_ENGINE_ID, BASE_URL } from '../config/api';

const fetchGoogleResults = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: 'artificial intelligence',
        num: 10,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch search results. Please try again later.');
  }
};

const StoryList = () => {
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['googleResults'],
    queryFn: fetchGoogleResults,
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
    return <div className="text-red-500">Error loading results: {error.message}</div>;
  }

  if (!stories || stories.length === 0) {
    return <div className="text-gray-500">No results found. Try searching for something!</div>;
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
