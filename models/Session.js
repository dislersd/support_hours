const { model, Schema } = require("mongoose");

const sessionSchema = new Schema({
  date: String,
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: {
    body: String,
    username: String,
    createdAt: String
  }
});

module.exports = model("Session", sessionSchema);