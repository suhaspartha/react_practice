import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100%",
    padding: "0.8rem",
    marginTop: "0.8rem",
    fontSize: "0.8rem",
  },
  colorNameInput: {
    width: "100%",
    height:"40px"
  },
};
class ColorpickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "black",
      newColorName: "",
    };
    this.changeCurrentColor = this.changeCurrentColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColornameUnique", (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }
  changeCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }
  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };
    this.props.addColor(newColor);
    this.setState({ newColorName: "" });
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  render() {
    const { isPaletteFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.changeCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            variant="filled"
            margin="normal"
            placeholder="Color name"
            value={newColorName}
            name="newColorName"
            onChange={this.handleChange}
            validators={["required", "isColornameUnique", "isColorUnique"]}
            errorMessages={[
              "Color name is required",
              "Color name already chosen",
              "Color already exists!",
            ]}
            className={classes.colorNameInput}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: isPaletteFull ? "lightgrey" : currentColor,
            }}
            type="submit"
            disabled={isPaletteFull}
            className={classes.addColor}
          >
            {isPaletteFull ? "Palette full" : "Add color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
export default withStyles(styles)(ColorpickerForm);
