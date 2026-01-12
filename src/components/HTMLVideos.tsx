import React, { useState, useEffect } from 'react';

const HTMLVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // You'll need to replace 'YOUR_API_KEY' with your actual YouTube Data API key
        // You should get this from Google Cloud Console
        const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
        const SEARCH_QUERY = 'HTML tutorial';
        const MAX_RESULTS = 10;

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${SEARCH_QUERY}&type=video&maxResults=${MAX_RESULTS}&key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        setVideos(data.items);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);

        // Fallback videos if API fails
        setVideos([
          {
            id: { videoId: 'UB1O30fR-EE' },
            snippet: {
              title: 'HTML Tutorial for Beginners',
              channelTitle: 'freeCodeCamp',
              thumbnails: {
                default: { url: 'https://img.youtube.com/vi/UB1O30fR-EE/default.jpg' }
              }
            }
          },
          {
            id: { videoId: 'qzRu1ZhKuJA' },
            snippet: {
              title: 'HTML Crash Course',
              channelTitle: 'Traversy Media',
              thumbnails: {
                default: { url: 'https://img.youtube.com/vi/qzRu1ZhKuJA/default.jpg' }
              }
            }
          }
        ]);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error && videos.length === 0) {
    return <div>Error loading videos: {error}</div>;
  }

  return (
    <div className="html-videos">
      <h3>HTML Tutorial Videos</h3>
      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video.id.videoId} className="video-item">
              <div>
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                  style={{ width: '120px', height: '90px', marginRight: '10px' }}
                />
                <div>
                  <h4>{video.snippet.title}</h4>
                  <p>By {video.snippet.channelTitle}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HTMLVideos;
