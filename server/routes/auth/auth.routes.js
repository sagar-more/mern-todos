const router = require("express").Router();
const { loginHandler, registerHandler } = require("./auth.handler");

router.post("/login", loginHandler);
router.post("/register", registerHandler);

module.exports = router;
