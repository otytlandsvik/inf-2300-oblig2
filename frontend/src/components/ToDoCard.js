import React, { useEffect, useState } from "react";

function ToDoCard(props) {
    const [status, setStatus] = useState("");

    useEffect(() => {
        let newStatus = props.done === true ? "Done" : "Not done";
        setStatus(newStatus);
    }, [props.done]);

    return (
        <div>
            <span>{props.name}</span>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
            <button onClick={() => props.onUpdate(props.id)}>Update</button>
            <button onClick={() => props.onDone(props.id)}>{status}</button>
        </div>
    );
}

export default ToDoCard;
