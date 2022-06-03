import mongoose from "mongoose";

// MARK:- MongoDB Connection
export default function connectMogodb() {
  mongoose.connect("mongodb://localhost:27017/order_tracking").then(() => {
    console.log("--> Connected to MongoDB");
  });
}
