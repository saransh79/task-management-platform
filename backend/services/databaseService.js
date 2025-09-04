const mongoose = require("mongoose");

class DatabaseService {
  async connect(uri = process.env.MONGODB_URI) {
    try {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      };

      await mongoose.connect(uri, options);
      console.log("Connected to MongoDB successfully");

      // Set up connection event listeners
      this.setupEventListeners();

      return mongoose.connection;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  // Disconnect from MongoDB
  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }

  // Check connection status
  getConnectionStatus() {
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    return {
      status: states[mongoose.connection.readyState],
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
    };
  }

  // Setup event listeners for connection monitoring
  setupEventListeners() {
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
    });

    connection.on("error", (error) => {
      console.error("Mongoose connection error:", error);
    });

    connection.on("disconnected", () => {
      console.log("Mongoose disconnected from MongoDB");
    });

    // Handle application termination
    process.on("SIGINT", async () => {
      try {
        await this.disconnect();
        console.log("Application terminated");
        process.exit(0);
      } catch (error) {
        console.error("Error during graceful shutdown:", error);
        process.exit(1);
      }
    });
  }

  // Health check for database
  async healthCheck() {
    try {
      const status = this.getConnectionStatus();

      if (status.status === "connected") {
        await mongoose.connection.db.admin().ping();
        return {
          status: "healthy",
          database: status,
          timestamp: new Date().toISOString(),
        };
      } else {
        return {
          status: "unhealthy",
          database: status,
          timestamp: new Date().toISOString(),
        };
      }
    } catch (error) {
      return {
        status: "error",
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Get database statistics
  async getStats() {
    try {
      const db = mongoose.connection.db;
      const stats = await db.stats();

      return {
        collections: stats.collections,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexes: stats.indexes,
        indexSize: stats.indexSize,
        objects: stats.objects,
      };
    } catch (error) {
      console.error("Error getting database stats:", error);
      throw error;
    }
  }

  // Clear all collections (for testing purposes)
  async clearDatabase() {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Cannot clear database in production");
    }

    try {
      const collections = await mongoose.connection.db.collections();

      for (let collection of collections) {
        await collection.deleteMany({});
      }

      console.log("Database cleared successfully");
    } catch (error) {
      console.error("Error clearing database:", error);
      throw error;
    }
  }
}

module.exports = new DatabaseService();
