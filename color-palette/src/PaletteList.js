import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MiniPalette from "./MiniPalette";
import {Link} from "react-router-dom";
import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {
  gotoPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div className={classes.palette}>
            {palettes.map((palette) => (
              <MiniPalette
                {...palette}
                handleClick={() => this.gotoPalette(palette.id)}
              />
              // did not use <Link/> it here bcz styling will be of <a>,
              // recommended not to use hece push to history
              // <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
