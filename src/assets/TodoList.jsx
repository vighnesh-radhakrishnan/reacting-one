import React from "react";

function TodoList({ toDo, toggleToDo }) {
  return toDo.map((todo) => {
    return (
      <div key={todo.id}>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => toggleToDo(todo.id)}
        />
        <label key={todo.id}>{todo.name}</label>
      </div>
    );
  });
}

export default TodoList;
