import React, { useState } from "react";

function Card(props) {
    return (
        <div>
            <span>{props.name}</span>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
        </div>
    );
}

export default Card;
