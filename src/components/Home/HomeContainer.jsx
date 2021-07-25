import React from "react";
import { useSelector } from "react-redux";

const HomeContainer = () => {
    const { user } = useSelector(store => store);
    return (
        <>
            <h1>Home</h1>
        </>
    );
};

export default HomeContainer;
