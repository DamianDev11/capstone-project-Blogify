import IAMPost from "../models/post";

export const getPosts = async (req, res) => {
  try {
    const blogs = await IAMPost.find({}).populate("user", "-password");
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getPost = async (req, res) => {
  try {
    const blog = await IAMPost.findById(req.params.id).populate(
      "user",
      "-password"
    );
    await blog.save();

    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const storePost = async (req, res) => {
  try {
    const blog = await IAMPost.create({ ...req.body, user: req.user.id });

    return res.status(201).json(blog);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updatePost = async (req, res) => {
  try {
    const blog = await IAMPost.findById(req.params.id);

    const objectId = blog.user;

    const id = objectId.toString();

    if (id !== req.user.id) {
      throw new Error("You can update only your post");
    }

    const updatedBlog = await IAMPost.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate("user", "-password");

    return res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const blog = await IAMPost.findById(req.params.id);
    const objectId = blog.user;
    const id = objectId.toString();
    if (id !== req.user.id) {
      throw new Error("You can delete only your post!");
    }
    await IAMPost.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
