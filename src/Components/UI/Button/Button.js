import React from "react";
import Button from "@material-ui/core/Button";

const useStyles = (theme) => ({

Success: {
    color: "#5C9210"
},
Danger : {
    color: "#944317"
}
});

const button = (props) => {
  const classes = useStyles;

  return (
    <Button
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.clicked}
    >
      {props.children}
    </Button>
  );
};

export default button;
