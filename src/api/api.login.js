import axiosInstance from "./axios";
import { LOG_IN, ERROR } from "../actions";

export const login = async (dispatch, { userEmail, password }) => {
    dispatch({ type: LOG_IN, payload: { loading: true } });
    try {
        const { data } = await axiosInstance.post("/login", { userEmail, password });
        dispatch({ type: LOG_IN, payload: { loading: false, success: data } });
    } catch (error) {
        dispatch({ type: LOG_IN, payload: { loading: false, error } });
    }
};
