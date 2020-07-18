import React from "react";
import Button from "@material-ui/core/Button";

const useStyles = (theme) => ({
 button: {
    color: theme.palette.primary,
  },
});

const button = (props) => {
  const classes = useStyles;

  return (
    <Button
      color='primary'
      disabled={props.disabled}
      className={[classes.button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </Button>
  );
};

export default button;
