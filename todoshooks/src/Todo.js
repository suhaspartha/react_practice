import React from "react";
import useToggleState from "./hooks/useToggleState";
import EditTodoForm from "./EditTodoForm";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CheckBox from "@material-ui/core/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

function Todo({ id, task, completed, removeTodo, toggleTodo, updateTodo }) {
  const [isEditing, toggle] = useToggleState(false);
  return (
    <ListItem style={{height:"64px"}}>
      {isEditing ? (
        <EditTodoForm
          id={id}
          task={task}
          updateTodo={updateTodo}
          toggle={toggle}
        />
      ) : (
        <>
          <CheckBox checked={completed} onClick={() => toggleTodo(id)} />
          <ListItemText style={{ textDecoration: completed && "line-through" }}>
            {task}
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton aria-label="delete" onClick={() => removeTodo(id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={() => toggle()}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}
export default Todo;
