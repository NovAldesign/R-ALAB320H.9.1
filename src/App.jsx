import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Complete homework", completed: false, isEditing: false },
    { id: 2, title: "Do the dishes", completed: false, isEditing: false },
    { id: 3, title: "Clean the bathroom", completed: true, isEditing: false },
  ]);

   const [editText, setEditText] = useState("");
   const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
  if (newTodo.trim() === "") return;
  setTodos([
    { id: Date.now(), title: newTodo, completed: false, isEditing: false },
    ...todos,
  ]);
  setNewTodo("");
};

 return (
    <div>
      <h1>Todo List</h1>
<div>
  <input
    type="text"
    value={newTodo}
    placeholder="Add a new todo..."
    onChange={(e) => setNewTodo(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
  />
  <button onClick={handleAddTodo}>Add Todo</button>
</div>

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

            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  onClick={() =>
                    setTodos(todos.map((t) =>
                      t.id === todo.id ? { ...t, title: editText, isEditing: false } : t
                    ))
                  }
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button
                  onClick={() => {
                    setEditText(todo.title);
                    setTodos(todos.map((t) =>
                      t.id === todo.id ? { ...t, isEditing: true } : t
                    ));
                  }}
                >
                  Edit
                </button>
                <button
                  disabled={!todo.completed}
                  onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
  