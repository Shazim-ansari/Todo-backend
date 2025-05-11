const express = require("express");
const router = express.Router();
const { CreateTodo, getAlltodo, deleteTodo, updateTodo } = require("../Controllers/TodoControoller");
const Middleware = require("../middleware/authorization");


router.post("/Create-Todo", Middleware, CreateTodo);
router.get("/GetAllTodo", Middleware, getAlltodo);
router.delete("/DeleteTodo:id", Middleware, deleteTodo);
router.put("/UpdateTodo:id", Middleware, updateTodo);
router.patch("/UpdateTodo:id", Middleware, updateTodo);

module.exports = router;
