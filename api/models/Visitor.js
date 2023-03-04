import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  count: {
    type: Number,
    count: 0,
  },
});

export default mongoose.model("Visitor", visitorSchema);
