import React, { Component } from "react";
import PaletteFormNav from "./PaletteFormNav";
import ColorpickerForm from "./ColorpickerForm";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DragableColorList from "./DragableColorList";
import { arrayMove } from "react-sortable-hoc";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/NewPaletteFormStyles";
import seedColors from "./seedColors";

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      colors: seedColors[0].colors,
    };
    this.addColor = this.addColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteColor = this.deleteColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  addColor(newColor) {
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: "",
    });
  }

  handleSubmit(newPalette) {
    const name = newPalette.paletteName;
    const emoji = newPalette.emoji;
    const newColors = {
      paletteName: name,
      emoji: emoji,
      id: name.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors,
    };
    this.props.saveColors(newColors);
    this.props.history.push("/");
  }
  deleteColor(colorToDelete) {
    this.setState({
      colors: this.state.colors.filter((color) => color.name !== colorToDelete),
    });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };
  clearColors() {
    this.setState({ colors: [] });
  }
  addRandomColor() {
    const allColors = this.props.palettes.map((p) => p.colors).flat();
    let random;
    let randColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      random = Math.floor(Math.random() * allColors.length);
      randColor = allColors[random];
      isDuplicateColor = this.state.colors.some(
        (color) => color.name === randColor.name
      );
    }
    this.setState({ colors: [...this.state.colors, randColor] });
  }
  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const isPaletteFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleDrawerOpen={this.handleDrawerOpen}
          handleSubmit={this.handleSubmit}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design your palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
                disabled={isPaletteFull}
                className={classes.button}
              >
                Random color
              </Button>
            </div>
            <ColorpickerForm
              isPaletteFull={isPaletteFull}
              colors={colors}
              addColor={this.addColor}
            />
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DragableColorList
            colors={this.state.colors}
            deleteColor={this.deleteColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
