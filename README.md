🚀 MERN URL Shortener

A full-stack URL Shortening web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) that allows users to convert long URLs into short, shareable links.

📌 Features

🔗 Convert long URLs into short links

⚡ Fast redirection to original URL

🗄️ MongoDB database storage

🌐 REST API based backend

💻 Full-stack MERN architecture

📈 Scalable backend design

🛠️ Tech Stack
Frontend

React.js

Axios

Tailwind CSS (if used)

Backend

Node.js

Express.js

Database

MongoDB

Mongoose

📂 Project Structure
mern-url-shortener/
│
├── frontend/
│   ├── src/
│   └── public/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── package.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/Praveen5258/mern-url-shortener.git
cd mern-url-shortener
2️⃣ Setup Backend
cd backend
npm install

Create .env file inside backend:

MONGO_URI=your_mongodb_connection_string
PORT=5000
BASE_URL=http://localhost:5000

Run backend:

npm start
3️⃣ Setup Frontend
cd frontend
npm install
npm start
🚀 Usage

Open the application in browser

Enter a long URL

Click Shorten

Get a shortened link

Use the short link for redirection

📸 Example
Original URL:
https://example.com/very-long-url

Short URL:
http://localhost:5000/abc123
📈 Learning Outcomes

Built REST APIs using Express

Integrated MongoDB for URL mapping

Implemented unique short link generation

Connected frontend with backend

Designed scalable full-stack architecture

QR Code generation

Deployment
