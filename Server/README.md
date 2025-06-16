# 🧠 Server - AI Video Generator Backend

This is the **backend** of the `ghost-oo5-ai-video-generator` project. It's built with **Node.js**, **Express**, and **MongoDB** using **Mongoose** for schema definition and data interaction.

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **REST API** Architecture

---

## 📁 Folder Structure

```
Server/
├── index.js                 # Entry point
├── app.js                   # Express app config
├── .gitignore
├── package.json
├── package-lock.json
├── Model/
│   ├── Generations.js       # Schema for real estate and suplimax generations
│   └── SuplimaxGeneration.js# Schema specifically for Suplimax use case
├── routes/
│   ├── generation.js        # API routes for Real Estate
│   └── suplimax.js          # API routes for Suplimax
└── startup/
    └── db.js                # MongoDB connection logic
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd Server
npm install
```

### 2. Run the Server

```bash
node index.js
# or with auto-reload
npx nodemon index.js
```

Server runs by default on **http://localhost:3002**

---

## 🔌 MongoDB Connection

- Configured via Mongoose in `startup/db.js`
- Uses default URI: `mongodb://localhost/ai-video-generator`
- On successful connection: logs `MongoDB Connected.....`

---

## 🔄 API Routes

### `/api/generations`  
Handles POST/GET for **real estate** and **suplimax** generation records.

#### POST

```json
{
  "type": "realestate",
  "image": { "mimeType": "image/png", "dataBase64": "..." },
  "script": { "text": "...", "scenesJSON": { ... } },
  "video": { "videoUrl": "...", "operationId": "..." }
}
```

#### GET  
Returns all generation records.

---

### `/api/suplimax`  
Handles POST/GET for **suplimax**-specific generation workflow.

#### POST

```json
{
  "inputs": {
    "features": "...",
    "tone": "...",
    "audience": "...",
    "videoStyle": "..."
  },
  "imagePrompt": "...",
  "image": "...",
  "imageDescription": "...",
  "videoScript": "..."
}
```

---

## 📦 Models

### `Generations.js`

- Handles both real estate and suplimax cases.
- Fields: `type`, `image`, `script`, `video`, `createdAt`

### `SuplimaxGeneration.js`

- Dedicated to Suplimax use case.
- Stores form inputs, image prompt/result, and video script.

---

## 🧪 Example Route Structure

In `app.js`:

```js
app.use('/api/generations', require('./routes/generation'));
app.use('/api/suplimax', require('./routes/suplimax'));
```

Index server in `index.js` binds app to port 3002.

---

## 📌 Notes

- MongoDB must be running on localhost.
- Error handling is basic; could be extended with logging middleware.
- Great candidate for containerization via Docker in future versions.

---

## 📄 License

MIT © ghost-oo5-ai-video-generator
