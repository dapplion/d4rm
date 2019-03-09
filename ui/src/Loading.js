import React from "react";
import loader from './loader.gif'

const Loading = () => (
    <div className="mx-auto text-center mt-4">
        <h5 style={{opacity: 0.5}}>Loading...</h5>
        <img src={loader} alt="loading"></img>
    </div>
)

export default Loading;
