import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorBoxStyles";
import clsx from "clsx";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const {
      name,
      background,
      level,
      moreURL,
      showFullPalette,
      classes,
    } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div
            style={{ background }}
            className={clsx(classes.copyOverlay, {
              [classes.showOverlay]: copied,
            })}
          />
          <div
            className={clsx(classes.copyMessage, {
              [classes.showMessage]: copied,
            })}
          >
            <h1>Copied</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{`${name} ${level}`}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showFullPalette && (
            <Link to={moreURL} onClick={(evt) => evt.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
export default withStyles(styles)(ColorBox);
