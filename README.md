# Aditya Campaign Website

## Project Structure
- **/public**: Contains all static files (HTML, CSS, Images, JS).
- **/server**: Contains the Node.js/Express backend code.
  - **models**: Mongoose database schemas.
  - **routes**: API route definitions.
  - **middleware**: Custom middleware (rate limiting, etc.).
  - **server.js**: Entry point for the backend.

## Database Setup (Choose One)

### Option A: Local MongoDB (Recommended for simplicity)
1. **Download:** Go to [MongoDB Community Server Download](https://www.mongodb.com/try/download/community).
2. **Install:** Run the installer.
   - Select "Complete" setup.
   - **Important:** Keep "Install MongoDB as a Service" checked.
   - Uncheck "Install MongoDB Compass" if you want a smaller install (optional).
3. **Verify:** The server is pre-configured to connect to `mongodb://localhost:27017/aditya_campaign`.
4. **Done:** No further configuration needed.

### Option B: Cloud MongoDB (Atlas)
1. **Sign Up:** Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. **Create Cluster:** Create a free "Shared" cluster.
3. **Setup User:** Create a database user (username/password).
4. **Network Access:** Allow access from anywhere (`0.0.0.0/0`) or your specific IP.
5. **Get String:** Click "Connect" > "Connect your application" > Copy the connection string.
6. **Update Config:**
   - Open `server/.env` file.
   - Replace `MONGO_URI` value with your new string.
   - Example: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/aditya_campaign`

## Installation
1. Open a terminal in the project root.
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
1. The `.env` file is located in `server/.env`.
2. Update `MONGO_URI` with your MongoDB connection string.

## Running the Server
- **Development (with auto-restart):**
  ```bash
  npm run dev
  ```
- **Production:**
  ```bash
  npm start
  ```
- Open http://localhost:5000 in your browser.

## API Endpoints
- **POST /api/volunteer**: Submit volunteer form data.
