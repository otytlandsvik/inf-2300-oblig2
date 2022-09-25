import React, { useState } from "react";

function Card(props) {
    return (
        <div>
            <span>{props.text}</span>
            <button onClick={props.onDelete}>Delete</button>
        </div>
    );
}

export default Card;
