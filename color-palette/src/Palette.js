import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./Palette.css";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  changeFormat(value) {
    this.setState({ format: value });
  }
  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.id}
        level={level}
        key={color.id}
        moreURL={`/palette/${id}/${color.id}`}
        showMoreLink
      />
    ));
    return (
      <div className="Palette">
        {/* {Nav bar here} */}
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          defaultFormat="hex"
          showSlider
        />
        <div className="Palette-colors">{colorBoxes}</div>
        {/* Footer */}
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default Palette;
