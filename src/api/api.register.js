import axiosInstance from "./axios";
import { REGISTER } from "../actions";

export const register = async (dispatch, { userEmail, password }) => {
    dispatch({ type: REGISTER, payload: { loading: true } });
    try {
        const { data } = await axiosInstance.post("/register", { userEmail, password });
        dispatch({ type: REGISTER, payload: { loading: false, success: data } });
    } catch (error) {
        dispatch({ type: REGISTER, payload: { loading: false, error } });
    }
};
