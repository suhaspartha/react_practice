import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  main: { backgroundColor: "purple", border: "3px solid teal" },
};
function MiniPalette(props) {
  const { classes } = props;
  return <div className={classes.main}>Mini palette</div>;
}
export default withStyles(styles)(MiniPalette);
