import { useState, useEffect } from "react";

export default function App() {

  // State to hold all todo items
  const [todos, setTodos] = useState([]);

  // State to hold the text when editing a todo
  const [editText, setEditText] = useState("");

  // State to hold the text of a new todo being typed
  const [newTodo, setNewTodo] = useState("");

  // Fetch initial todos from the JSONPlaceholder API when the app first loads
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => res.json())
      .then((data) => {
        // Add isEditing property to each todo since the API doesn't include it
        setTodos(data.map((todo) => ({ ...todo, isEditing: false })));
      });
  }, []); 

  // Handles adding a new todo to the top of the list
  const handleAddTodo = () => {
    // Prevent adding empty todos
    if (newTodo.trim() === "") return;
    setTodos([
      { id: Date.now(), title: newTodo, completed: false, isEditing: false },
      ...todos, // Keep all existing todos below the new one
    ]);
    // Clear the input after adding
    setNewTodo("");
  };

  return (
    <div>
      <h1>Todo List</h1>

      {/* Input to add a new todo */}
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          placeholder="Add a new todo..."
          onChange={(e) => setNewTodo(e.target.value)}
          // Allow pressing Enter to add a todo
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      {/* Loop through and display each todo */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>

            {/* Checkbox to mark todo as complete or incomplete */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                setTodos(todos.map((t) =>
                  
                  t.id === todo.id ? { ...t, completed: !t.completed } : t
                ))
              }
            />

            {/* Show edit input if isEditing is true, otherwise show the title */}
            {todo.isEditing ? (
              <>
                {/* Text input pre-filled with current todo title */}
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                {/* Save button updates the title and exits edit mode */}
                <button
                  className="btn-save"
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
                {/* Strike through title if todo is completed */}
                <span className={todo.completed ? "completed" : ""}>{todo.title}</span>

                {/* Edit button sets isEditing to true and pre-fills editText */}
                <button
                  className="btn-edit"
                  onClick={() => {
                    setEditText(todo.title);
                    setTodos(todos.map((t) =>
                      t.id === todo.id ? { ...t, isEditing: true } : t
                    ));
                  }}
                >
                  Edit
                </button>

                {/* Delete button removes todo - disabled until todo is complete */}
                <button
                  className="btn-delete"
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