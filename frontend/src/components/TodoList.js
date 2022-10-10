import React, { useEffect, useState } from "react";
import ToDoCard from "./ToDoCard.js";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";

/* Initialize api */
const api = axios.create({
    baseURL: "http://localhost:5000/api/",
});

function TodoList() {
    /* Todo item count */
    const [count, setCount] = useState(0);
    /* Error message */
    const [errMsg, setErrMsg] = useState("");
    /* Input text for new card */
    const [input, setInput] = useState("");
    /* List of cards */
    const [cards, setCards] = useState([]);

    /* Fetch data on mount */
    useEffect(() => {
        getData();
    }, []);

    /* Change count based on not done cards*/
    useEffect(() => {
        setCount(cards.filter((c) => c.done === false).length);
        /* Also remove errMsg */
        setErrMsg("");
    }, [cards]);

    function catchAPIError(err) {
        console.log(err);
        if (err.code === "ERR_NETWORK") {
            /* No response */
            console.log("No response from server");
            setErrMsg("No response from server!");
        } else if (err.response) {
            /* Server returned error response */
            console.log(err.response.status + err.response.statusText);
            setErrMsg(err.response.status + " " + err.response.statusText);
        } else {
            console.log("Unknown error");
            setErrMsg("Unknown error!");
        }
    }

    /* Fetch data from REST api */
    const getData = async () => {
        /* Send GET request to api */
        await api
            .get("/items/")
            .then(({ data }) => {
                setCards(data.items);
            })
            .catch((err) => {
                catchAPIError(err);
            });
    };

    /* Add item to todolist */
    const handleAdd = async () => {
        /* Do not add empty todo */
        if (!input) {
            return;
        }
        /* Send POST request to api */
        await api
            .post("/items/", { name: input })
            .then((res) => {
                const newCard = res.data.item;
                /* Add new card */
                setCards((prevCards) => [
                    ...prevCards,
                    {
                        id: newCard.id,
                        name: newCard.name,
                    },
                ]);
                /* Empty text input */
                setInput("");
            })
            .catch((err) => {
                catchAPIError(err);
            });
    };

    /* Remove item from todolist */
    const handleDelete = async (id) => {
        /* Send DELETE request to api */
        await api
            .delete(`/items/${id}`)
            .then(() => {
                /* Filter out deleted card */
                const newCards = cards.filter((c) => c.id !== id);
                setCards(newCards);
            })
            .catch((err) => {
                catchAPIError(err);
            });
    };

    /* Update name of todolist item */
    const handleUpdate = async (id) => {
        /* Do not add empty todo */
        if (!input) {
            return;
        }
        /* Send PUT request to api */
        await api
            .put(`/items/${id}`, { name: input })
            .then((res) => {
                /* Update edited card with response data */
                const newCards = cards.map((c) => {
                    if (c.id === id) {
                        return { ...c, name: res.data.item.name };
                    }
                    return c;
                });
                setCards(newCards);
                /* Empty text input */
                setInput("");
            })
            .catch((err) => {
                catchAPIError(err);
            });
    };

    /* Update status of todolist item */
    const handleUpdateStatus = async (id) => {
        /* Get status of card */
        const idx = cards.findIndex((c) => c.id === id);
        const newStatus = !cards[idx].done;
        /* Send PUT request to api */
        await api
            .put(`/items/${id}`, { done: newStatus })
            .then((res) => {
                /* Update card with given id */
                const newCards = cards.map((c) => {
                    if (c.id === id) {
                        return { ...c, done: res.data.item.done };
                    }
                    return c;
                });
                setCards(newCards);
            })
            .catch((err) => {
                catchAPIError(err);
            });
    };

    return (
        <div className="m-2">
            <h4 style={{ color: "white" }}>
                Pending todos: <Badge>{count}</Badge>
            </h4>

            {errMsg && (
                <Alert variant="danger" style={{ width: "18rem" }}>
                    {errMsg}
                </Alert>
            )}

            <Stack direction="horizontal" gap={3}>
                <Form>
                    <Form.Control
                        type="text"
                        value={input}
                        placeholder="Type your new todo..."
                        onChange={(e) => setInput(e.target.value)}
                    ></Form.Control>
                </Form>
                <Button onClick={handleAdd}>Add</Button>
            </Stack>
            {cards.map((card) => (
                <ToDoCard
                    id={card.id}
                    key={card.id}
                    name={card.name}
                    done={card.done}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onDone={handleUpdateStatus}
                />
            ))}
        </div>
    );
}

export default TodoList;
