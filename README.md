# CanvasConnect

CanvasConnect is a collaborative drawing application where users can sketch and draw in real-time. Users can create and edit shapes like lines, rectangles, and ellipses, pick any color, and clear the canvas. The app supports real-time collaboration, allowing connected users to share their canvas via Socket.IO.

## Preview

Here are some screenshots of CanvasConnect in action:

### Home Screen
![Screenshot from 2025-01-20 16-40-01](https://github.com/user-attachments/assets/df7df46f-0147-4e70-8751-aed67a9371cb)


### Collaborative Drawing
![Screenshot from 2025-01-20 16-56-12](https://github.com/user-attachments/assets/9ddd042a-6e16-4e4f-be73-5f3d8dae19da)

## Features
- **Draw Shapes:** Users can draw lines, rectangles, and ellipses.
- **Pick Colors:** Choose from a color palette to customize drawing.
- **Clear Canvas:** Clear the entire canvas with a button.
- **Real-time Collaboration:** Users can draw on the same canvas with others in real-time using Socket.IO.

## Project Structure
This project consists of two main folders:
1. **frontend** - Contains the React app for the user interface.
2. **backend** - Contains the server-side code using Node.js and Socket.IO.

## Installation

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Starting the Backend
1. In the `backend` folder, start the server:
   ```bash
   node index.js
   ```
   The backend will be running on `http://localhost:3000`.

### Starting the Frontend
1. In the `frontend` folder, start the React app:
   ```bash
   npm run dev
   ```
   The frontend will be running on `http://localhost:5173`.

Now, open both the frontend and backend in your browser, and you can start collaborating with others on the canvas!

## Technologies Used
- **Frontend:** React,Tailwind, Roughjs
- **Backend:** Node.js, Socket.IO, Express
