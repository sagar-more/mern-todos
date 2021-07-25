const todoSchema = require("../../models/todo");
const { validateID } = require("../../utils");

const getHandler = async (req, res, next) => {
    try {
        const todos = await todoSchema.find({ userID: req.body.id });
        res.json(todos);
    } catch (error) {
        next(error);
    }
};
const postHandler = async (req, res, next) => {
    try {
        const todo = new todoSchema(req.body);
        const created = await todo.save();
        res.json(created);
    } catch (error) {
        next(error);
    }
};
const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        validateID(id);
        const todo = await todoSchema.findByIdAndDelete(id);
        res.json(todo);
    } catch (error) {
        next(error);
    }
};
const putHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        validateID(id);
        const todo = await todoSchema.findByIdAndUpdate(id, req.body, { new: true });
        if (!todo) {
            throw new Error("ID not found");
        }
        res.json(todo);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHandler,
    postHandler,
    putHandler,
    deleteHandler,
};
