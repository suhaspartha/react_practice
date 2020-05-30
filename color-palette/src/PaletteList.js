import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import styles from "./styles/PaletteListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class PaletteList extends Component {
  gotoPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes, deletePalette } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palette}>
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  handleClick={() => this.gotoPalette(palette.id)}
                  handleDelete={deletePalette}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
              // did not use <Link/> it here bcz styling will be of <a>,
              // recommended not to use hece push to history
              // <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
