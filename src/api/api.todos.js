import axiosInstance from "./axios";
import { CREATE_TODO, LOAD_TODOS } from "../actions";

export const getTodos = async (dispatch) => {
    dispatch({ type: LOAD_TODOS, payload: { loading: true } });
    try {
        const { data } = await axiosInstance.get("/todos");
        dispatch({ type: LOAD_TODOS, payload: { loading: false, success: data } });
    } catch (error) {
        dispatch({ type: LOAD_TODOS, payload: { loading: false, error } });

    }
};

export const createTodo = async ({ userID, title, description }) => {
    dispatch({ type: CREATE_TODO, payload: { loading: true } });
    try {
        const { data } = await axiosInstance.post("/todo", {
            userID,
            title,
            description,
        });
        dispatch({ type: CREATE_TODO, payload: { loading: true, success: data } });
    } catch (error) {
        dispatch({ type: CREATE_TODO, payload: { loading: false, error } });
    }
};
