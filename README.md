
# Cloudinary Multer File Upload

A comprehensive full-stack application for uploading and managing files, built with React, TypeScript, Tailwind CSS, Node.js, Express, Multer, and Cloudinary.

---

## Features

- **Frontend**: Built with React and TypeScript, styled using Tailwind CSS.
  - Form to upload files (images, documents, etc.).
  - File upload with progress bar.
  - Responsive and user-friendly UI.

- **Backend**: Node.js with Express.
  - Handles form submissions and file uploads.
  - Uses **Multer** for parsing form-data and handling file uploads.
  - **Cloudinary** integration for cloud storage of images and files.
  - MongoDB for data storage.

- **API Communication**: Axios for seamless communication between frontend and backend.

---

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **MongoDB**: A MongoDB instance or cluster (local or cloud-based).
- **Cloudinary**: An active Cloudinary account.

---

## Installation

### Clone Repository

You can clone the repository using the following URL:

```bash
git clone https://github.com/inaveed-git/cloudinary-multer-file-upload.git
```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Configuration:
   - Locate the `.env.simple` file in the `backend` directory.
   - Rename it to `.env`:
     ```bash
     mv .env.simple .env
     ```
   - Open the `.env` file and add your configurations:
     ```env
     MONGO_URI=your-mongodb-url
     CLOUDINARY_NAME=your-cloudinary-cloud-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     ```
   - Visit [Cloudinary](https://cloudinary.com/) to create an account and obtain your API credentials.

---

## Usage

- Navigate to the frontend URL provided by the development server.
- Upload files (images, documents, etc.) via the form.
- Monitor upload progress with the progress bar.
- The files will be stored on Cloudinary, and details will be saved to MongoDB.

---

## Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- Multer
- Cloudinary
- MongoDB

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.



