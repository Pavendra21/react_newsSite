import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewsDisplay = () => {
  const { category } = useParams(); // Get category from URL params
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const newsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/top-headlines?category=${category || 'general'}&lang=en&country=in&max=10&apikey=90755c70adfdfd4a2a6c6fee3422407e`
        );
        setNews(response.data.articles || []);
      } catch (error) {
        setError('Failed to fetch news articles.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [category]); // Refetch when category changes

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / newsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Top'} News
      </h1>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!isLoading && !error && currentNews.length > 0 ? (
          currentNews.map((article, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-md hover:shadow-md flex flex-col">
              <h2 className="text-lg md:text-xl font-bold mb-2">{article.title}</h2>
              {article.image && <img src={article.image} alt={article.title} className="w-full h-48 md:h-60 object-cover rounded mb-2" />}
              <p className="text-gray-700 mb-2">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-auto">
                Read More
              </a>
              <p className="text-gray-500 text-sm mt-1">Published on: {new Date(article.publishedAt).toDateString()}</p>
            </div>
          ))
        ) : (
          !isLoading && <p className="text-center">No news articles available.</p>
        )}
      </div>
      {!isLoading && news.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsDisplay;
