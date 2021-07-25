const register = require("../../models/user");
const todoSchema = require("../../models/todo");
const { createHmac } = require("crypto");
const { checkEmailID, checkPassword } = require("../../utils");

const secretAlgo = process.env.SECRET_ALGO;
const secretKey = process.env.SECRET_KEY;

const createHashedPassword = (password) => {
    const hmac = createHmac(secretAlgo, secretKey);
    return hmac.update(password).digest("hex");
};

const checkHashedPassword = (password, hashedPassword) => {
    return hashedPassword === createHashedPassword(password);
};
const loginHandler = async (req, res, next) => {
    try {
        const { userEmail, password } = req.body;
        checkEmailID(userEmail);
        const user = await register.findOne({ userEmail });
        if (!user) {
            throw new Error(`Incorrect Email ID or Password`);
        } else if (checkHashedPassword(password, user.password)) {
            const todos = await todoSchema.find({ userID: user.id });
            res.send({ user, todos });
        } else {
            throw new Error(`Incorrect Email ID or Password`);
        }
    } catch (error) {
        next(error);
    }
};

const registerHandler = async (req, res, next) => {
    try {
        const { userEmail, password } = req.body;
        const existingUser = await register.findOne({ userEmail });
        if (existingUser) {
            // USER exist
            throw new Error(`Email ID already exists`);
        }
        checkEmailID(userEmail);
        checkPassword(password);
        const hashedPassword = createHashedPassword(password);
        const newUser = new register({ userEmail, password: hashedPassword });
        const user = await newUser.save();
        res.send(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginHandler,
    registerHandler
};
