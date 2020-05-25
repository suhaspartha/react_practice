import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./ColorBox.css";
import "./Palette.css";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.generateShades(this.props.palette, this.props.colorId);
    console.log(this._shades);
    this.state = {};
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
  render() {
    const colorBoxes = this._shades.map((color) => (
      <ColorBox key={color.id} name={color.name} background={color.hex} showMoreLink={false}/>
    ));
    return (
      <div className="Palette">  
          <h1>single color box</h1>
          <div className="Palette-colors">{colorBoxes}</div>
        
      </div>
    );
  }
}
export default SingleColorPalette;
