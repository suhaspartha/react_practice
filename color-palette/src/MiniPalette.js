import React, { PureComponent } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/MiniPaletteStyles";

// use pure component to avoid rerendering even if only one elem in state changes
class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  deletePalette(evt) {
    evt.stopPropagation();
    this.props.openDialog(this.props.id);
    //this.props.handleDelete(this.props.id);
  }
  handleClick() {
    this.props.gotoPalette(this.props.id);
  }
  render() {
    const { classes, paletteName, emoji, colors } = this.props;
    // to prove that re-rendering doesn't happen now
    console.log("RENDERING:", paletteName);
    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.miniColors}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));
    return (
      <div className={classes.root} onClick={this.handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={this.deletePalette}
        />
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}
export default withStyles(styles)(MiniPalette);
