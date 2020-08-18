const router = require("express").Router();
const { User, todoSchema } = require("../models/user-model");

const authCheck = (req, res, next) => {
  if(!req.user) {
    res.redirect("/");
  }
  else {
    next();
  }
}

router.get("/my-todos", authCheck, (req, res) => {
  res.render("my-todos", { user: req.user });
});

router.get("/add-todo", (req, res) => {
  res.render("add-todo", { user: req.user });
});

router.post("/profile/add-todo", authCheck, (req, res) => {
  console.log(req.user._id, req.body);
  const newTodo = {
    todoName: req.body.todoName,
    todoDescription: req.body.todoDescription,
    todoStatus: "Open"
  };  

  User.findByIdAndUpdate(req.user._id, { $push: { todos:  newTodo} })
    .then((result) => res.redirect("/profile/my-todos"))
    .catch(err => console.log(err));
  });
  
  router.delete("/delete-todo/:id", (req, res) => {
    const todoId = req.params.id;
    console.log("todo-id:", todoId, "user-id:", req.user._id); 
    User.findByIdAndUpdate(req.user._id, { $pull: { todos: { _id: todoId } } })
    .then((result) => res.json({ redirect: "/profile/my-todos" }))
    .catch(err => console.log(err));
});

module.exports = router;