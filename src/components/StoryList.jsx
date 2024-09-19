import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryItem from './StoryItem';
import { Skeleton } from "@/components/ui/skeleton";
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config/api';

const fetchLatestAINews = async () => {
  const response = await axios.get(`${BASE_URL}/everything`, {
    params: {
      q: 'artificial intelligence',
      sortBy: 'publishedAt',
      language: 'en',
      pageSize: 20,
      apiKey: API_KEY,
    },
  });
  return response.data.articles;
};

const StoryList = () => {
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['latestAINews'],
    queryFn: fetchLatestAINews,
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
    return <div className="text-red-500">Error loading AI news: {error.message}</div>;
  }

  if (!stories || stories.length === 0) {
    return <div className="text-gray-500">No stories found.</div>;
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
