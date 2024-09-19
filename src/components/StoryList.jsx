import React from 'react';
import StoryItem from './StoryItem';
import { Skeleton } from "@/components/ui/skeleton";
import { mockStories } from '../data/mockStories';

const StoryList = ({ searchTerm }) => {
  const filteredStories = mockStories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.snippet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredStories.length === 0) {
    return <div className="text-gray-500">No results found. Try searching for something else!</div>;
  }

  return (
    <div className="space-y-4">
      {filteredStories.map((story, index) => (
        <StoryItem key={index} story={story} />
      ))}
    </div>
  );
};

export default StoryList;
