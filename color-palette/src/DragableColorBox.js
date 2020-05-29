import React from "react";
import { withStyles } from "@material-ui/core/styles";

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
  },
};
function DragableColorBox(props) {
return <div className={props.classes.root}>{props.name}</div>;
}
export default withStyles(styles)(DragableColorBox);
