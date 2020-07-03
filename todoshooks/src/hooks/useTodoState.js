import uuid from "uuid/dist/v4";
import useLocalStorage from "./useLocalStorageState";

export default (initialTodos) => {
  const [todos, setTodos] = useLocalStorage("todos", initialTodos);
  return {
    todos,
    addTodo: (newTodoItem) => {
      setTodos([...todos, { id: uuid(), task: newTodoItem, completed: false }]);
    },
    removeTodo: (todoId) => {
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
    },
    toggleTodo: (todoId) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    },
    updateTodo: (id, updatedTask) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTask } : todo
      );
      setTodos(updatedTodos);
    },
  };
};
