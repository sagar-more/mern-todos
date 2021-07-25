const router = require("express").Router();
const todoRouter = require("./todo/todo.routes");
const authRouter = require("./auth/auth.routes");

router.use("/", authRouter);
router.use("/", todoRouter);

module.exports = router;
