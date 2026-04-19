// db.js
// Responsible for establishing a connection to MongoDB using Mongoose.
// This function is called when the server starts to ensure the database is ready.

import mongoose from "mongoose";

// Connect to MongoDB database
export const connectDB = async () => {
  try {
    // Attempt to connect using the connection string stored in environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log the host to confirm a successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any connection errors for debugging purposes
    console.error(`Error: ${error.message}`);

    // Exit the application if the database connection fails
    // process.exit(1) indicates an unsuccessful execution
    process.exit(1);
  }
};
