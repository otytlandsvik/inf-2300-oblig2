function Card(props) {
    return (
        <div>
            <span>{props.name}</span>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
            <button onClick={() => props.onUpdate(props.id)}>Update</button>
        </div>
    );
}

export default Card;
