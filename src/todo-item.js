import React from "react";

const ListItem = (prob) => {
  return (
    <li className="list-group-item">
      <button
        className="btn-sm btn btn-info"
        onClick={prob.editTodo}
      >
        E
      </button>
      {prob.item.name}
      <button
        className="btn-sm btn btn-danger"
        onClick={prob.deleteTodo}
      >
        X
      </button>
    </li>
  );
};

export default ListItem;