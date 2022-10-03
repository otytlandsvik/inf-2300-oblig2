import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";

function ToDoCard(props) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    let newStatus = props.done ? "Done" : "Not done";
    setStatus(newStatus);
  }, [props.done]);

  return (
    <Card
      bg="dark"
      text="white"
      border={props.done ? "success" : "danger"}
      style={{ width: "18rem" }}
      className="m-2 p-2"
    >
      <Card.Title>{props.name}</Card.Title>
      <ButtonGroup>
        <Button variant="danger" onClick={() => props.onDelete(props.id)}>
          Delete
        </Button>
        <Button variant="primary" onClick={() => props.onUpdate(props.id)}>
          Update
        </Button>
        <Button variant="primary" onClick={() => props.onDone(props.id)}>
          {status}
        </Button>
      </ButtonGroup>
    </Card>
  );
}

export default ToDoCard;
