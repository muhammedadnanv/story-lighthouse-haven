import React from 'react';
import { ExternalLink } from 'lucide-react';

const StoryItem = ({ story }) => {
  if (!story) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">{story.title || 'No Title'}</h2>
      <p className="text-sm text-gray-600 mb-2">{story.description || 'No description available'}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Source: {story.source?.name || 'Unknown'}</span>
        {story.url && (
          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            Read More <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default StoryItem;
