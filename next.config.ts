import { NextConfig } from "next";
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_URL,
    TMDB_IMAGE_SERVICE_URL: process.env.TMDB_IMAGE_SERVICE_URL,
    API_KEY: process.env.API_KEY,
  },
    turbopack: {
    root: path.join(__dirname, '..'), // Sets the root to the parent directory
  },
  
};

export default nextConfig;
