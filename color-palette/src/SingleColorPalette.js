import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
import "./ColorBox.css";
import "./Palette.css";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    backgroundColor: "black",
    opacity: "1",
    "& a":{
      width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    opacity: "1",
    textDecoration: "none"
    }
  },
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  colors: {
    height: "90vh",
  },
};
class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.generateShades(this.props.palette, this.props.colorId);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
  }
  generateShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }
  changeFormat(value) {
    this.setState({ format: value });
  }
  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.id}
        level={color.name.split(" ")[1]}
        background={color[format]}
        showFullPalette={false}
      />
    ));
    return (
      <div className={classes.Palette}>
        {
          <Navbar
            handleChange={this.changeFormat}
            defaultFormat={format}
            showSlider={false}
          />
        }
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>
              Go BACK
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
export default withStyles(styles)(SingleColorPalette);
