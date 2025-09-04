# FinLearn
A finance education platform with virtual trading and real-time stock data.

## Features
- Virtual trading dashboard
- Real-time stock price visualization
- Chatbot for financial queries

## Installation
1. Clone the repository: `git clone https://github.com/your-username/FinLearn.git`
2. Install frontend dependencies: `cd frontend && npm install`
3. Install backend dependencies: `cd ../backend && npm install`
4. Set up environment variables in `frontend/.env` and `backend/.env`
5. Run the backend: `cd backend && node server.js`
6. Run the frontend: `cd frontend && npm run dev`

## Environment Variables
- `REACT_APP_TWELVE_DATA_API_KEY`: Twelve Data API key
- `MONGO_URI`: MongoDB connection string
- `SESSION_SECRET`: Session secret for Express
- `HUGGINGFACE_API_KEY`: Hugging Face API key