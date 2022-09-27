import React, { useEffect, useState } from "react";
import Card from "./Card.js";
import axios from "axios";

/* Initialize api */
const api = axios.create({
    baseURL: "http://localhost:5000/api/",
});

function TodoList() {
    /* Todo item count */
    const [count, setCount] = useState(0);
    /* Input text for new card */
    const [input, setInput] = useState("");
    /* List of cards */
    const [cards, setCards] = useState([]);

    /* Fetch data on mount */
    useEffect(() => {
        getData();
    }, []);

    /* Change count based on cards length */
    useEffect(() => {
        setCount(cards.length);
    }, [cards]);

    /* Fetch data from REST api */
    const getData = async () => {
        /* Send GET request to api */
        const items = await api.get("/items/").then(({ data }) => data.items);
        setCards(items);
    };

    /* Add item to todolist */
    const handleAdd = async () => {
        /* Send POST request to api */
        await api.post("/items/", { name: input }).then((res) => {
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
        });
    };

    /* Remove item from todolist */
    const handleDelete = async (id) => {
        /* Send DELETE request to api */
        await api.delete(`/items/${id}`).then(() => {
            /* Filter out deleted card */
            const newCards = cards.filter((c) => c.id !== id);
            setCards(newCards);
        });
    };

    /* Update name of todolist item */
    const handleUpdate = async (id) => {
        /* Send PUT request to api */
        await api.put(`/items/${id}`, { name: input }).then((res) => {
            /* Update edited card with response data */
            let newCards = cards;
            let idx = newCards.findIndex((c) => c.id === id);
            newCards[idx].name = res.data.item.name;
            setCards(newCards);
            /* Empty text input */
            setInput("");
        });
    };

    /* Update status of todolist item */
    const handleUpdateStatus = async (id) => {
        /* Get status of card */
        const idx = cards.findIndex((c) => c.id === id);
        const newStatus = !cards[idx].done;
        /* Send PUT request to api */
        await api.put(`/items/${id}`, { done: newStatus }).then((res) => {
            /* Update edited card with response data */
            let newCards = cards;
            newCards[idx].done = res.data.item.done;
            setCards(newCards);
        });
    };

    return (
        <div>
            <span>Pending todos: {count}</span>
            <br></br>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></input>
            <button onClick={handleAdd}>Add</button>
            {cards.map((card) => (
                <Card
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
