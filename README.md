# Chattrr

Welcome to **Chattrr**, a full-stack chat application built using the MERN stack! This README provides a comprehensive guide to understanding, setting up, and using Chattrr. It covers everything from the project's features and architecture to installation instructions and usage details.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Screenshots](#screenshots)
8. [Contributing](#contributing)

## Project Overview

**Chattrr** is a real-time chat application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It provides a seamless chatting experience with features like direct messaging, channels, profile management, and media sharing. The project follows the MVC architecture on the backend and is fully responsive on the frontend.

## Features

- **Authentication**: Secure login and signup using JSON Web Tokens.
- **Profile Management**: Users must complete their profile setup after registration. They can also edit their profile and change their profile picture.
- **Real-Time Messaging**: Instant message updates using Socket.io.
- **Direct Messaging**: One-on-one chat with other users.
- **Channels**: Create and join channels for group chats.
- **Media Sharing**: Send images and files with options to view and download.
- **Responsive Design**: Fully responsive and optimized for all devices.
- **Logout**: Securely logout from the application.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Zustand**: State management.
- **React Router**: Navigation between different pages.
- **Tailwind CSS & Shadcn**: Styling and responsive design.
- **React Lottie**: Animations.
- **React Icons**: Icons.
- **Axios**: HTTP requests.

### Backend

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **Socket.io**: Real-time communication.
- **Multer**: File handling.
- **Bcrypt**: Password encryption.
- **JSON Web Token**: Authentication.
- **Mongoose**: MongoDB object modeling.

### Database

- **MongoDB Atlas Cloud**: Cloud database.



## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **MongoDB Atlas**: Set up a MongoDB Atlas account and cluster.

### Setup Instructions

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/sahidmidda/Chattrr-MERN.git
    cd Chattrr-MERN
    ```

2. **Backend Setup**:

    ```bash
    cd server
    npm install
    ```

3. **Frontend Setup**:

    ```bash
    cd client
    npm install
    ```

4. **Environment Variables**:

    Environment files are already there both in `server` and       `client` directory you just have to replace the values of the  variables.



5. **Run the Application**:

    Open two terminals and run the following commands:

    **Backend**:

    ```bash
    cd server
    npm run dev
    ```

    **Frontend**:

    ```bash
    cd client
    npm run dev
    ```

    The application should now be running at `http://localhost:5173`.

## Usage

### Registration and Login

- Access the application and sign up with your email and password.
- After signing up, complete your profile by adding your first and last name.
- You'll be redirected to the chats page.

### Chatting

- **Direct Messages**: Search for a contact and start a one-on-one chat.
- **Channels**: Create a channel, add users, and start a group conversation.
- **Real-Time Updates**: Messages will appear instantly thanks to Socket.io.
- **Media Sharing**: Send images and files, which can be viewed (image) and downloaded.

### Profile Management

- Edit your profile details.
- Change your profile picture.

### Logout

- Securely log out from your account.

## API Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Log in a user.
- **POST /api/auth/logout**: Logout user.

### User Profile

- **GET /api/auth/user-info**: Get current user info.
- **POST /api/auth/update-profile**: Update user's profile.
- **POST /api/auth/add-profile-image**: Add profile image.
- **DELETE /api/auth/remove-profile-image**: Remove profile image.

### Contact

- **POST /api/contacts/search**: Search a contact.
- **GET /api/contacts/get-contacts-for-dm**: Get contacts for DM list.
- **GET /api/contacts/get-all-contacts**: Get all contacts.

### Message

- **GET /api/messages/get-messages**: Get all messages.
- **POST /api/messages/upload-file**: Upload a file in conversation.

### Channels

- **POST /api/channel/create-channel**: Create a new channel.
- **GET /api/channel/get-user-channel**: Get channels of current user.
- **PUT /api/channel/get-channel-messages/:channelId**: Get messages of a particular channel.

## Screenshots

Include screenshots of the application here to give users a visual overview.

![Login Page](link_to_login_screenshot)
![Profile Setup](link_to_profile_screenshot)
![Chat Page](link_to_chat_screenshot)
![Channel Page](link_to_channel_screenshot)

## Contributing

We welcome contributions! If you’d like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

### Steps to Contribute

1. **Fork the Repository**:

    ```bash
    git clone https://github.com/your-username/Chattrr.git
    cd Chattrr
    ```

2. **Create a Branch**:

    ```bash
    git checkout -b feature-branch
    ```

3. **Make Changes**: Implement your feature or fix the bug.

4. **Commit Changes**:

    ```bash
    git commit -m "Description of changes"
    ```

5. **Push Changes**:

    ```bash
    git push origin feature-branch
    ```

6. **Create Pull Request**: Submit your pull request to the `main` branch.


---

Thank you for using **Chattrr**! If you have any questions or feedback, please feel free to reach out. Let's connect and build something amazing together! 🚀
