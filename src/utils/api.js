import axios from 'axios';

const BASE_URL = 'https://hn.algolia.com/api/v1';

export const fetchTopStories = async () => {
  const response = await axios.get(`${BASE_URL}/search?tags=front_page&hitsPerPage=100`);
  return response.data.hits;
};

export const searchStories = async (query) => {
  const response = await axios.get(`${BASE_URL}/search?query=${encodeURIComponent(query)}&hitsPerPage=100`);
  return response.data.hits;
};