# SocialX 🚀  
A full-stack social media application built using the MERN stack, featuring authentication, post creation, likes, comments, and role-based delete functionality.

---

## 🌐 Live Demo
- **Frontend (Vercel):** https://vishu-social.vercel.app/
- **Backend (Render):** https://socialx-jaxy.onrender.com

---

## ✨ Features

### 🔐 Authentication
- User signup & login using JWT
- Secure password hashing with bcrypt
- Token-based authorization for protected routes

### 📝 Posts
- Create text-based posts
- View a global public feed
- Delete your own posts (owner-only)

### ❤️ Engagement
- Like and unlike posts
- Add comments to posts
- Delete your own comments

### 🎨 UI
- Clean, responsive UI inspired by modern social feeds
- Built using Material UI (MUI)
- Conditional rendering based on login state

---

## 🛠 Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- Axios
- Vite

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MongoDB Atlas

### Deployment
- Frontend: **Vercel**
- Backend: **Render**

---

## 📁 Project Structure

```text
SocialX/
│
├── backend/
│ ├── config/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.jsx
│ └── main.jsx
│
└── README.md
```


---

## 🔐 Authentication Flow

1. User logs in or signs up
2. Backend returns a JWT token
3. Token is stored in `localStorage`
4. Axios interceptor attaches token to every request
5. Protected routes validate token using middleware

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/signup` – Register a new user
- `POST /api/auth/login` – Login user

### Posts
- `GET /api/posts` – Fetch all posts
- `POST /api/posts/create` – Create a new post
- `DELETE /api/posts/:id` – Delete own post
- `POST /api/posts/:id/like` – Like a post
- `POST /api/posts/:id/comment` – Add comment
- `DELETE /api/posts/:postId/comment/:commentId` – Delete own comment

---

👨‍💻 Author
Vishu Bhardwaj
GitHub: https://github.com/vishu2724

⭐ If you like this project
Give it a ⭐ on GitHub!
