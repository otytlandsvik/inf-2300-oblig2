import React, { useState } from "react";
import Card from "./Card.js";

function TodoList(props) {
    /* Todo item count */
    const [count, setCount] = useState(3);
    /* Input text for new card */
    const [input, setInput] = useState();
    /* List of cards */
    const [cards, setCards] = useState(() => {
        return [
            { id: 0, text: "Do the dishes" },
            { id: 1, text: "Blow me" },
            { id: 2, text: "Watch south park" },
        ];
    });

    /* Add card on button click */
    function addCard() {
        /* Increment number of cards on list */
        setCount((prevCount) => prevCount + 1);
        /* Add new card */
        setCards((prevCards) => [
            ...prevCards,
            {
                id: count,
                text: input,
            },
        ]);
        /* Empty text input */
        setInput("");
        console.log(input);
    }

    /* Delete card on button click */
    function handleDelete(id) {
        /* Filter out card with given id */
        const newCards = cards.filter((c) => c.id != id);
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
                onChange={(e) => setInput(e.target.value)}
                value={input}
            ></input>
            <button onClick={addCard}>Add</button>
            {cards.map((card) => (
                <Card
                    id={card.id}
                    key={card.id}
                    text={card.text}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}

export default TodoList;
