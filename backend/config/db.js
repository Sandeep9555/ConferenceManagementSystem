const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    // Ensure that MONGO_URL is set correctly
    const mongoUri =
      process.env.MONGO_URL ||
      "mongodb+srv://dbuser:DBuser123@cluster0.ou9fr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    if (!mongoUri) {
      console.error("MongoDB URI is not defined. Please check your .env file.");
      process.exit(1);
    }

    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if database connection fails
  }
};

module.exports = connectDb;
