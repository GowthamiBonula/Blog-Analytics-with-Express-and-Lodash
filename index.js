const express = require('express');
const axios = require('axios');
const lodash = require('lodash');
const app = express();
const PORT = process.env.PORT || 8000;

// Function to fetch the blog data from the API
const fetchBlogsData = async () => {
  try {
    const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
      headers: {
        'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
      },
    });

    return response.data; // Return the entire API response
  } catch (error) {
    console.error('Error fetching blogs data:', error);
    throw error;
  }
};

// Middleware to ensure blog data is available
const ensureBlogsData = async (req, res, next) => {
  try {
    const blogsData = await fetchBlogsData();
    if (!blogsData || !Array.isArray(blogsData.blogs)) {
      res.status(500).json({ error: 'Invalid or empty blog data from the API' });
    } else {
      req.blogs = blogsData.blogs; // Store the entire API response
      next();
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog data' });
  }
};

app.get('/api/blog-stats', async (req, res) => {
    try {
      // Data Retrieval
      console.log('Request received at /api/blog-stats');
  
      const apiURL = 'https://intent-kit-16.hasura.app/api/rest/blogs';
      const response = await axios.get(apiURL, {
        headers: {
          'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
        },
      });
      const apiData = response.data;
      //console.log('API Response:', blogs);
      if (!apiData || !Array.isArray(apiData.blogs)) {
        res.status(500).json({ error: 'Invalid or empty blog data from the API' });
        return;
      }
  
      // Data Analysis
      const blogs = apiData.blogs;
      const totalBlogs = blogs.length; 
  
      let longestTitle = '';
      let longestTitleLength = 0;
  
      blogs.forEach((blog) => {
        if (blog.title && typeof blog.title === 'string') {
          // Check if the blog has a valid title
          const titleLength = blog.title.length;
          if (titleLength > longestTitleLength) {
          // Update the longest title if the current title is longer
            longestTitle = blog.title;
            longestTitleLength = titleLength;
          }
        }
      });
  
      
      const blogsWithPrivacy = lodash.filter(blogs, (blog) => lodash.includes(lodash.toLower(blog.title), 'privacy'));
      const uniqueTitles = lodash.uniqBy(blogs, 'title');
  
      // Prepare the response
      const stats = {
        totalBlogs, 
        longestTitle: longestTitle || 'N/A',
        blogsWithPrivacy: blogsWithPrivacy.length,
        uniqueTitles: uniqueTitles.map((blog) => blog.title || 'N/A'),
      };
  
      // Respond to the client with JSON
      res.json(stats);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch or analyze blog data' });
    }
  });
  

app.get('/api/blog-search', ensureBlogsData, (req, res) => {
  try {
    const blogs = req.blogs; // Use the blogs data stored in the request

    // Get the search query from the request query parameters
    const query = req.query.query || '';

    // Check if the query is empty or not provided
    if (!query.trim()) {
      return res.status(400).json({ error: 'Please provide a valid search query' });
    }

    // Perform case-insensitive search 
    const searchResults = lodash.filter(blogs, (blog) =>
      lodash.includes(lodash.toLower(blog.title), lodash.toLower(query))
    );

    // Search results
    res.json(searchResults);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Failed to perform blog search' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }).on('error', (error) => {
    console.error(error);
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Choose a different port.`);
    } else {
      console.error('Failed to start the server.');
    }
  });
  
