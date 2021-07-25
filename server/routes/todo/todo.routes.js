const router = require("express").Router();
const { getHandler, postHandler, deleteHandler, putHandler } = require("./todo.handler");

router.get("/todos", getHandler);
router.post("/todo", postHandler);
router.delete("/todo/:id", deleteHandler);
router.put("/todo/:id", putHandler);

module.exports = router;
