const db = require("../model");
const Post = db.posts;
module.exports = {
  createPost: async (req, res) => {
    const postData = {
      userId: req.user.id,
      ...req.body,
    };
    console.log(postData);
    const post = await Post.create(postData);
    res.status(200).json({
      message: "Post Create Successfully",
      post,
    });
  },
  allPost: async (req, res) => {
    const posts = await Post.findAll({
      order: [ [ 'createdAt', 'DESC' ]],
      include: [
        {
          model: db.users,
          as: "user",
          attributes: ["name", "email"],
        }, 
      ],
      attributes: {
        exclude: ["userId"]
      }
    });
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({
        message: "No Post Found",
      });
    }
  },
  getAllPostByUser: async(req, res)=>{
    const user = req.user.id;
    const posts = await Post.findAll({
      where: {userId: user},      
      order: [ [ 'createdAt', 'DESC' ]],
      include: [
        {
          model: db.users,
          as: "user",
          attributes: ["name", "email"]
        },
      ], 
      attributes: {
        exclude: ["userId"]
      }
    });
    if(posts !== null){
      res.status(200).json(posts);
    }else{
      res.status(400).json({
        message: 'No Post Found'
      })
    }
  },
  getPostById: async (req, res) => {
    const id = req.params.id;
    const post = await Post.findOne({ where: { id: id }, include: [
        {
          model: db.users,
          as: "user",
          attributes: ["name", "email"]
        },
      ], 
      attributes: {
        exclude: ["userId"]
      }
    });
    if (post !== null) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "No Post Found",
      });
    }
  },
  updatePost: async (req, res) => {
    const id = req.params.id;
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
    const id = req.params.id;
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
