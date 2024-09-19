import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2';
const API_KEY = 'YOUR_NEWS_API_KEY'; // Replace with your actual News API key

export const fetchLatestAINews = async () => {
  const response = await axios.get(`${BASE_URL}/everything`, {
    params: {
      q: 'artificial intelligence AND (developer OR programming)',
      sortBy: 'publishedAt',
      language: 'en',
      pageSize: 100,
      apiKey: API_KEY,
    },
  });
  return response.data.articles;
};

export const searchAINews = async (query) => {
  const response = await axios.get(`${BASE_URL}/everything`, {
    params: {
      q: `${query} AND (artificial intelligence) AND (developer OR programming)`,
      sortBy: 'publishedAt',
      language: 'en',
      pageSize: 100,
      apiKey: API_KEY,
    },
  });
  return response.data.articles;
};
