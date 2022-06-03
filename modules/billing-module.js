import mongoose from "mongoose";
const { Schema } = mongoose;
const billingSchema = new mongoose.Schema({
  id: Number,
  name: String,
  api_client_id: Number,
  price: String,
  status: String,
  return_url: String,
  billing_on: Schema.Types.Mixed,
  created_at: String,
  updated_at: String,
  test: Schema.Types.Mixed,
  activated_on: Schema.Types.Mixed,
  cancelled_on: Schema.Types.Mixed,
  trial_days: Schema.Types.Mixed,
  trial_ends_on: Schema.Types.Mixed,
  decorated_return_url: Schema.Types.Mixed,
  confirmation_url: String,
  shop: String,
  Session: Schema.Types.Mixed,
});
export default mongoose.model("billing_data", billingSchema);
