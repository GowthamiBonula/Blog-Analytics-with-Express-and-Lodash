# Blog Analytics and Search Tool

This project is a blog analytics and search tool developed using Express.js and Lodash. It aims to provide insights into blog data retrieved from a third-party blog API and offers a blog search functionality.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Features

- **Data Retrieval**: Fetches blog data from a third-party API using a specified curl request.

- **Data Analysis**: Performs analytics on the retrieved data, including calculating the total number of blogs, finding the longest blog title, counting blogs with "privacy" in the title, and generating an array of unique blog titles.

- **Blog Search**: Implements a search functionality that allows users to filter blogs based on a query parameter, providing case-insensitive search results.

- **Error Handling**: Handles errors that may occur during data retrieval, analysis, or searching, ensuring appropriate error messages are returned to clients.

## Prerequisites

Before running the project, ensure you have the following prerequisites:

- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) (Node Package Manager) installed

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
2. Navigate to the project directory:
    cd blog-analytics-tool
3. Install project dependencies:
   - **Nodemon
   - **Lodash and others

## Usage

To run the project, use the following command:

- nodemon index.js
The server will start, and you can access the API endpoints to fetch blog statistics and perform blog searches.

## API Endpoints 

The project provides the following API endpoints:

- **/api/blog-stats: Fetches and analyzes blog statistics. (GET request)
- **/api/blog-search?query=privacy: Performs a blog search based on a query parameter.

## Error Handling

The project includes robust error handling to ensure that errors during data retrieval, analysis, or searching are gracefully handled. Appropriate error messages will be returned to clients.
