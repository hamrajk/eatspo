const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const Users = require("../models/users");
const Posts = require("../models/posts");

//Given 2 user ideas, add 1 to the others friends array
router.post("/addFriends", (req, res, next) => {
  Users.update(
    { _id: req.body.userIDadder },
    {
      $push: {
        friends: req.body.userIDtarget,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

//Given a userID and a postID, update the savedPosts field in users.js
router.post("/savedPostsUpdate", (req, res, next) => {
  Users.update(
    { _id: req.body.userID },
    {
      $push: {
        savedPosts: req.body.postID,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

//Given a userID and a postID, update the savedBy field in posts.js
router.post("/savedByUpdate", (req, res, next) => {
  Posts.update(
    { _id: req.body.postID },
    {
      $push: {
        savedBy: req.body.userID,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

//This is to get Users info from user schema
router.post("/findUserByUserName", (req, res, next) => {
  //this is to get the UserID
  //   let query = Users.find({ username: req.body.username });
  //   console.log(query);
  Users.find({ username: req.body.username })
    .then((data) => {
      res.json(data);
      console.log(data[0]);
    })
    .catch(next);
});

//This is to get Users info from user schema
router.post("/findUserByUserID", (req, res, next) => {
  //this is to get the UserID
  //   let query = Users.find({ username: req.body.username });
  //   console.log(query);
  Users.find({ _id: req.body.userID })
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

//This is to return all posts, given userID
router.post("/findPostsGivenUserID", (req, res, next) => {
  //   let query = Users.find({ username: req.body.username });
  //   console.log(query);
  Posts.find({ userID: req.body.userID })
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

router.post("/users", (req, res, next) => {
  if (req.body) {
    Users.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

router.get("/posts", (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Posts.find({},)
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/posts", (req, res, next) => {
  if (req.body) {
    Posts.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

router.get("/todos", (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Todo.find({}, "action")
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/todos", (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

router.delete("/todos/:id", (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
