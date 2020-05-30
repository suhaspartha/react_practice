import sizes from "./sizes";

const styles = {
  root: {
    height: "25%",
    width: "20%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    backgroundColor: (props) => props.color,
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)",
    },
    [sizes.down("lg")]: {
      width: "20%",
      height:"20%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height:"10%"
    },
    [sizes.down("sm")]: {
      width: "100%",
      height:"10%"
    },
  },
  boxContent: {
    align: "bottom",
    left: "0px",
    bottom: "0px",
    textTransform: "uppercase",
    fontSize: "12px",
    padding: "10px",
    color: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: "all 0.2s ease-in-out",
  },
};

export default styles;
