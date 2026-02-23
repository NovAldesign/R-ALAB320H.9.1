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
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                setTodos(todos.map((t) =>
                  t.id === todo.id ? { ...t, completed: !t.completed } : t
                ))
              }
            />
            <span>{todo.title}</span>
            <button
            disabled={!todo.completed}
            onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}>
          Delete
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
