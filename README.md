# StudyNook – Library Study Room Booking

Live Site: https://assignment-nine-ten-sepia.vercel.app/my-listings

Live server site: https://assignment-nine-server-seven.vercel.app/

## Project Overview

StudyNook is a full-stack web application where users can browse, list, and book library study rooms easily. Users can manage their own room listings and bookings with secure authentication and a responsive user interface.

---

## Features

- User authentication with JWT and HTTP-only cookies
- Add, update, and delete personal study room listings
- Book study rooms with time conflict protection
- Search and filter rooms by name and amenities
- Responsive design for mobile, tablet, and desktop devices
- My Bookings and My Listings dashboard
- Google login authentication
- Toast notifications for all success and error messages
- Dynamic page titles and custom 404 page

---

## Technologies Used

### Client Side

- React
- React Router
- Tailwind CSS
- Firebase Authentication
- Axios
- React Hot Toast / Sonner

### Server Side

- Node.js
- Express.js
- MongoDB
- JWT
- Cookie Parser
- CORS

---

## Pages

- Home
- Rooms
- Room Details
- Add Room
- My Listings
- My Bookings
- Login
- Register

---

## Environment Variables

Create a `.env` file in both client and server projects.

### Client

```env
VITE_API_URL=your_server_url
VITE_FIREBASE_API_KEY=your_key
```
