import mongoose from "mongoose";
const { Schema } = mongoose;
const sessionSechema = new mongoose.Schema({
  id: String,
  shop: String,
  accessToken: String,
  appStatus: {
    type: Boolean,
    required: true,
    default: true,
  },
  host: String,
});
export default mongoose.model("shop", sessionSechema);
