import React, { useState } from "react";

function Card(props) {
    return (
        <div>
            <span>{props.text}</span>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
        </div>
    );
}

export default Card;
