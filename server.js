import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 9000;
const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
const dbName = process.env.DB_NAME || "todoDB";

connectDB(mongoURI, dbName);
app.use(express.json());

// Routes for todo API
app.use("/api/v1/todos", todoRoutes);
// Routes for user API
app.use("/api/v1/users", userRoutes);
//Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (!process.env.VERCEL && isMain) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
