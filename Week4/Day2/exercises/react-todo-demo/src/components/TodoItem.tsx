import React from "react";
import { todo } from "./ListToDo";

interface todoItemprops {
  todo: todo;
}

export default function TodoItem(props: todoItemprops) {
  const { todo } = props;
  return (
    <li key={todo.id} className={todo?.complete ? "complete" : ""}>
      {todo?.id} - {todo?.task} status -{" "}
      {todo?.complete ? "Completed" : "pending"}
    </li>
  );
}
