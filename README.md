# Novus - Intelligent News Aggregator

![Novus Logo](frontend/public/novus-logo.svg)

Novus is a modern, AI-powered news aggregation platform that delivers personalized news experiences through advanced recommendation systems and semantic search capabilities. Our platform gathers news from around the world while using our own insights and advanced search methods to give you a clearer, more engaging look at the stories that matter.

## Features

- **Intelligent News Aggregation**: Curates news from multiple trusted sources
- **Personalized Feed**: Tailored news recommendations based on reading patterns
- **Semantic Search**: Advanced search functionality using AI embeddings
- **Category Navigation**: Easy access to news across different categories
- **Dark/Light Mode**: Comfortable reading experience in any lighting condition
- **Responsive Design**: Seamless experience across all devices

## Tech Stack

### Frontend

- React 19
- React Router DOM
- Context API for state management
- CSS3 with modern features
- Responsive design principles

### Backend

- Node.js
- Express.js
- PostgreSQL with pgvector
- OpenAI Embeddings
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/novus.git
cd novus
```

2. Set up the backend

```bash
cd backend
npm install
# Create .env file and add your configurations
npm run db:reset
npm run dev
```

3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```
