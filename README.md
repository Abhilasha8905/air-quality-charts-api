# Air Quality Charts API

## Overview

The **Express Air Quality API** is a RESTful API built using Node.js and Express that stores measurements csv data to Mongo DB.
It also exposes API endpoints to fetch data based on time interval and by category (CO, Benzene etc).

## Features

- Attach unique operation_id to each API request for easy tracing and debugging
- Parse CSV data and store to Mongo DB
- Get list of data filtered by date interval

## Tech Stack

- **Node.js Typescript**
- **Express.js**
- **Mongo DB**

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abhilasha8905/air-quality-charts-api.git
   cd air-quality-charts-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run start
   ```

## API Endpoints

### Import data from csv file to Mongo DB

**POST** `/air-quality-data`

- Parses and saves csv file data to Mongo DB.

### Fetch air quality data

**GET** `/air-quality-data`

- fetches air quality data from database
- similar requests response are cached to reduce DB calls
- accepts date range filter

### Fetch measurement metadata

**GET** `/air-quality-metadata`

- returns metadata related to measurements

## API Documentation

For detailed API documentation, visit the Swagger UI:
[Air Quality Charts API Docs](https://air-quality-charts-api.onrender.com/api-docs/)
