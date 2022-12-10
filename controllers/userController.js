const db = require("../model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = db.users;
const Post = db.posts;

module.exports = {
  registerUser: async (req, res) => {
    const { name, email, password, mobile, district } = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser === null) {
      return bcrypt.hash(password, 11, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const newUser = { name, email, password: hash, mobile, district };
          User.create(newUser)
            .then((user) => {
              res.status(201).json({
                message: "user created successfully",
                user: {
                  name: user.name,
                  email: user.email,
                },
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                message: "server error occurd",
              });
            });
        }
      });
    } else {
      res.status(400).json({
        message: "user already registered",
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    console.log(user);
    if (user === null) {
      res.status(404).json({
        message: "User Not Found",
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (!result) {
            res.status(204).json({
              message: "Password Not Matched",
            });
          } else {
            const userData = {
              id: user.id,
              email: user.email,
            };
            const token = jwt.sign(userData, process.env.SECRET, {
              expiresIn: "1d",
            });
            res.status(200).json({
              message: "Login Successfully",
              token,
            });
          }
        }
      });
    }
  },
  getAllUser: async (req, res) => {
    const allUser = await User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Post,
          as: "posts", //same as models/index.js
          attributes: { exclude: ["userId"] },
        },
      ],
    });
    if (allUser.length > 0) {
      res.status(200).json(allUser);
    } else {
      res.status(203).json({
        message: "No User Found",
      });
    }
  },
  getSingleUser: async (req, res) => {
    const id = req.user.id;
    const user = await User.findOne({
      where: { id: id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          as: "posts", //same as models/index.js
          attributes: { exclude: ["userId"] },
        },
      ],
    });
    if (user === null) {
      res.status(400).json({
        message: "User Not Found",
      });
    } else {
      res.status(200).json(user);
    }
  },
  updateUser: async (req, res) => {
    const id = req.params.id;
    console.log(id, req.body)
    const updatedUser = await User.update(req.body, { where: { id: id } });
    if (updatedUser[0] > 0) {
      res.status(200).json({
        message: "Update Successfully",
      });
    } else {
      res.status(404).json({
        message: "User Not Found",
      });
    }
  },
  deleteUser: async (req, res) => {
    const id = req.params.id;
    const deletedUser = await User.destroy({ where: { id: id } });
    if (deletedUser > 0) {
      res.status(200).json({
        message: "User Delete Successfully",
      });
    } else {
      res.status(404).json({
        message: "User Not Found",
      });
    }
  },
};
