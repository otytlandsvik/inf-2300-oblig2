import React, { useEffect, useState } from "react";
import Card from "./Card.js";
import axios from "axios";

/* Initialize api */
const api = axios.create({
    baseURL: `http://localhost:5000/api/`,
});

function TodoList(props) {
    /* Todo item count */
    const [count, setCount] = useState(0);
    /* Input text for new card */
    const [input, setInput] = useState("");
    /* List of cards */
    const [cards, setCards] = useState([]);

    /* Fetch data on mount */
    useEffect(() => {
        getData().then((newCards) => {
            setCount(newCards.length);
        });
    }, []);

    /* Fetch data from REST api */
    const getData = async () => {
        const items = await api.get("/items").then(({ data }) => data.items);
        const newCards = [];
        for (let i = 0; i < items.length; i++) {
            const newCard = { id: 0, name: "" };
            newCard.id = items[i].id;
            newCard.name = items[i].name;
            newCards.push(newCard);
        }
        setCards(newCards);
        return newCards;
    };

    /* Add card on button click */
    function addCard() {
        /* Increment number of cards on list */
        setCount((prevCount) => prevCount + 1);
        /* Add new card */
        setCards((prevCards) => [
            ...prevCards,
            {
                id: cards[cards.length - 1].id + 1,
                name: input,
            },
        ]);
        /* Empty text input */
        setInput("");
    }

    /* Delete card on button click */
    function handleDelete(id) {
        /* Filter out card with given id */
        const newCards = cards.filter((c) => c.id !== id);
        /* Set new cards to useState hook */
        setCards(newCards);
        /* Decrement count */
        setCount((prevCount) => prevCount - 1);
    }

    return (
        <div>
            <span>Pending todos: {count}</span>
            <br></br>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></input>
            <button onClick={addCard}>Add</button>
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
