import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      newPaletteName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  showEmojiPicker() {
    this.setState({ stage: "emoji" });
    //   () => handleSubmit(newPaletteName)
  }
  savePalette(emoji) {
      console.log(emoji)
    const newPalette = {
        paletteName: this.state.newPaletteName,
        emoji: emoji.native
    }
    this.props.handleSubmit(newPalette)
  }
  render() {
    const { stage, newPaletteName } = this.state;
    const {  hideForm } = this.props;
    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
        <DialogTitle id="form-dialog-title">
              Choose a palette emoji
            </DialogTitle>
          <Picker onSelect={this.savePalette} title="Pick a palette emoji" emoji='art'/>
        </Dialog>
        <Dialog
          open={stage === "form"}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogTitle id="form-dialog-title">
              Choose a name for palette
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter palette name and make sure it is unique!
              </DialogContentText>
              <TextValidator
                value={newPaletteName}
                fullWidth
                margin="normal"
                name="newPaletteName"
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Palette name is required", "Name is used"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}
export default PaletteMetaForm;
