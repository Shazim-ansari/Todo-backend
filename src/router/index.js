const express = require("express");
const router = express.Router();


const Todoroutes = require("./TodoRoutes")
const Authroutes = require("./AuthRoutes")


router.use("/auth", Authroutes);
router.use("/todo", Todoroutes);

module.exports = router;
