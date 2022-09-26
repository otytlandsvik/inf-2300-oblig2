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
        const items = await api.get("/items/").then(({ data }) => data.items);
        const newCards = [];
        /* Populate cards with data received */
        for (let i = 0; i < items.length; i++) {
            const newCard = { id: 0, name: "" };
            newCard.id = items[i].id;
            newCard.name = items[i].name;
            newCards.push(newCard);
        }
        setCards(newCards);
    };

    /* Post data to REST api */
    const handleAdd = async () => {
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

    /* Send delete request to REST api */
    const handleDelete = async (id) => {
        await api.delete(`/items/${id}`).then(() => {
            /* Filter out deleted card */
            const newCards = cards.filter((c) => c.id !== id);
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
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}

export default TodoList;
