"use server";

import { connectToDatabase } from "../database/mongoose";
import Message from "../database/models/support.model";
import User from "../database/models/user.model";

export async function sendMessage({ message, userId }: { message: string, userId: string }) {
  await connectToDatabase();

  const user = await User.findById(userId);

  const newMessage = await Message.create({
    message,
    userId,
    user: user._id
  })

  // return JSON.parse(JSON.stringify(newMessage))
  return JSON.stringify(newMessage);
}