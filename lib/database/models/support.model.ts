import { Schema, model, models } from "mongoose";

const SupportModel = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Message = models?.Message || model("Message", SupportModel);

export default Message;