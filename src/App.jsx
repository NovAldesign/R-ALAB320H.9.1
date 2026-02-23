import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Complete homework", completed: false, isEditing: false },
    { id: 2, title: "Do the dishes", completed: false, isEditing: false },
    { id: 3, title: "Clean the bathroom", completed: true, isEditing: false },
  ]);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.title}>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

