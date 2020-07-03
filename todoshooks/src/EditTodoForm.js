import React from "react";
import useInputState from "./hooks/useInputState";
import TextField from "@material-ui/core/TextField";

function EditTodoForm({ id, task, updateTodo, toggle }) {
  const [value, handleChange] = useInputState(task);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateTodo(id, value);
        toggle();
      }}
      style={{margin:"1rem", width:"100%"}}
    >
      <TextField
        value={value}
        onChange={handleChange}
        label="Edit todo"
        margin="normal"
        fullWidth
        autoFocus
      />
    </form>
  );
}
export default EditTodoForm;
