const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  list: [
    {
      name: {
        type: String,
      },
      cost: {
        type: Number,
      },
      amount: {
        type: Number,
      },
    },
  ],
  user: {
    ref: "users",
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model("orders", orderSchema);
