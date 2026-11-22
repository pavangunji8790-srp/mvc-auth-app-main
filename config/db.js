import mongoose from "mongoose";

let cachedPromise = null;

const connectDB = async (mongoUri, dbName) => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  if (!cachedPromise) {
    const uri = mongoUri || process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      console.warn("MONGODB_URI environment variable is not defined");
      return null;
    }
    cachedPromise = mongoose
      .connect(uri, {
        dbName: dbName || process.env.DB_NAME || "todoDB",
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 5,
        minPoolSize: 0,
      })
      .then((m) => {
        console.log("Connected to MongoDB");
        return m.connection;
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
        cachedPromise = null;
      });
  }
  return cachedPromise;
};

export default connectDB;
