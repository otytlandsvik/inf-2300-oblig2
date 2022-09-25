import React, { useState } from "react";
import Card from "./Card.js";

function TodoList(props) {
    const [count, setCount] = useState(4);
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
    }

    /* Delete card on button click */
    function handleDelete(id) {
        /* Filter out card with given id */
        const newCards = cards.filter((c) => c.id != id);
        /* Set new cards to useState hook */
        setCards(newCards);
    }

    return (
        <div>
            <span>Pending todos: {count}</span>
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
