import mongoose from "mongoose";

export default async function connectDb() {
  if (process.env.NODE_ENV === "development") {
    mongoose.set("overwriteModels", true);
  }
  const readyState = mongoose.connection.readyState;

  if (readyState > 0) {
    console.log("Already connected to database");
    return;
  }

  mongoose.connection.on("error", (error) => {
    console.error("Mongoose: error %s", error);
  });

  for (const event of ["connected", "reconnected", "disconnected", "close"]) {
    mongoose.connection.on(event, () => console.log("Mongoose: %s", event));
  }

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL environment variable is not set");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("Mongo connect failed:", error);
    throw error;
  }
}
