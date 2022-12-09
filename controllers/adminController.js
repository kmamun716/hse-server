const db = require("../model");
const User = db.users;
const Post = db.posts;
module.exports = {
  updateUser: async (req, res) => {
    const id = req.params.userId;
    const updatedUser = await User.update(req.body, { where: { id: id } });
    if (updatedUser[0] > 0) {
      res.status(200).json({
        message: "User Status Update Successfully",
      });
    } else {
      res.status(404).json({
        message: "User Not Found",
      });
    }
  },
  deleteUser: async (req, res) => {
    const id = req.params.userId;
    const deletedUser = await User.destroy({where: {id: id}});
    if(deletedUser>0){
        res.status(200).json({
            message: "User Delete Successfully"
        })
    }else{
        res.status(404).json({
            message: "User Not Found"
        })
    }
  },
  updatePost: async (req, res) => {
    const id = req.params.postId;
    const updatedPost = await Post.update(req.body, { where: { id: id } });
    if (updatedPost[0] > 0) {
      res.status(200).json({
        message: "Post Status Update Successfully",
      });
    } else {
      res.status(404).json({
        message: "Post Not Found",
      });
    }
  },
  deletePost: async (req, res) => {
    const id = req.params.postId;
    const deletedPost = await Post.destroy({where: {id: id}});
    if(deletedPost>0){
        res.status(200).json({
            message: "Post Delete Successfully"
        })
    }else{
        res.status(404).json({
            message: "Post Not Found"
        })
    }
  },
};
