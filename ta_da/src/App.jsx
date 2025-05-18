import { useImmerReducer } from "use-immer";
import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

// Initial state
const initialTodos = [
  { id: 1, text: "find that missing sock", completed: false, isEditing: false },
];

// Reducer function
function todoReducer(draft, action) {
  switch (action.type) {
    case "ADD_TODO":
      draft.unshift({
        id: Date.now(),
        text: action.text,
        completed: false,
        isEditing: false,
      });
      break;
    case "TOGGLE_COMPLETE":
      {
        const todo = draft.find((t) => t.id === action.id);
        if (todo) todo.completed = !todo.completed;
      }
      break;
    case "DELETE_TODO":
      {
        const idx = draft.findIndex((t) => t.id === action.id);
        if (idx !== -1) draft.splice(idx, 1);
      }
      break;
    case "START_EDIT":
      {
        const todo = draft.find((t) => t.id === action.id);
        if (todo) todo.isEditing = true;
      }
      break;
    case "SAVE_EDIT":
      {
        const editTodo = draft.find((t) => t.id === action.id);
        if (editTodo) {
          editTodo.text = action.newText;
          editTodo.isEditing = false;
        }
      }
      break;
    default:
      throw new Error();
  }
}

function App() {
  const [todos, dispatch] = useImmerReducer(todoReducer, initialTodos);
  const [input, setInput] = React.useState("");

  function handleAddTodo(e) {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: "ADD_TODO", text: input });
      setInput("");
    }
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>
      <TodoList todos={todos} dispatch={dispatch} />
      </div>
  );
}

export default App;
