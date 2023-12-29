import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image:{
    type:String
  },
  user: {
    type: ObjectId,
    ref: "IAMUser",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});


const IAMPost = model("IAMPost", postSchema);

export default IAMPost;
