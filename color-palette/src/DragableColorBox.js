import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    height: "25%",
    width: "20%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    backgroundColor: (props) => props.color,
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)",
    },
  },
  boxContent: {
    align: "bottom",
    left: "0px",
    bottom: "0px",
    textTransform: "uppercase",
    fontSize: "12px",
    padding: "10px",
    color: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: "all 0.2s ease-in-out",
  },
};
function DragableColorBox(props) {
  const { classes, name, handleClick } = props;
  return (
    <div className={classes.root}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
}
export default withStyles(styles)(DragableColorBox);
