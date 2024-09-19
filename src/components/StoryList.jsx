import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryItem from './StoryItem';
import { Skeleton } from "@/components/ui/skeleton";
import { faker } from '@faker-js/faker';

const generateFakeNews = (count = 10) => {
  return Array.from({ length: count }, () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    url: faker.internet.url(),
    source: {
      name: faker.company.name()
    },
    publishedAt: faker.date.recent().toISOString()
  }));
};

const fetchLatestAINews = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return generateFakeNews(20);
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
