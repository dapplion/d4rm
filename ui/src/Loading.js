import React from "react";
import loader from './loader.gif'

const Loading = () => (
    <div class="mx-auto text-center mt-4">
        <h5 style={{opacity: 0.5}}>Loading...</h5>
        <img src={loader}></img>
    </div>
)

export default Loading;
