import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Header from "../../Header";
import { isAutenticate } from "../../awsAuth/utils.auth";
import { useSelector } from "react-redux";

const Layouts = props => {
  const classes = useStyles();
  const matchesSmall = useMediaQuery("(max-width:350px)");
  const matches = useMediaQuery("(max-width:660px)");
  const user = useSelector(state => state.user);
  return (
    <div className={classes.containerPage}>
      {isAutenticate(user) && <Header />}
      <div
        className={
          matchesSmall && matches
            ? classes.root
            : matches
              ? classes.root1
              : classes.root2
        }
      >
        {props.children}
      </div>
    </div>
  );
};
const defaultProps = {
  containerPage: {
    display: "grid",
    width: "100%",
    justifyItems: "center"
  },
  containerBg: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#EDF0F5",
    "& .MuiFormLabel-root": {
      color: "#000"
    },
    "& .MuiInputBase-inputMarginDense": {
      color: "rgba(0, 0, 0, 0.60)"
    },
    "& MuiInputBase-input": {
      height: "1.9em"
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #ffffff"
    },
    "& .PrivateNotchedOutline-root-26": {
      borderWidth: 0
    },
    "& .MuiInput-underline:after": {
      borderBottom: "1px solid #ffffff"
    },
    "& .MuiInputBase-root": {
      background: "#ffffff"
    },
    "& .MuiFormControlLabel-label": {
      color: "#000000",
      fontWeight: "bold"
    }
  },
  root: {
    width: "100%",
    minHeight: "60vh",
    "& .responsive": {
      display: "grid",
      justifyItems: "center",
      zIndex: 1
    }
  }
};
const useStyles = makeStyles(() => ({
  ...defaultProps,
  root: {
    ...defaultProps.root,
    "& .cards-List": {
      width: "170px !important",
      height: "90px !important"
    },
    "& .MuiTab-wrapper": {
      fontSize: "10px"
    },
    "& .select-Boton": {
      width: "270px !important"
    },
    "& .cont-res": {
      width: "100%",
      display: "grid",
      justifyContent: "center",
      alignItems: "center",
      gridTemplateColumns: "50% 30% 20%",
      fontSize: 13
    },
    "& .textCard": {
      fontSize: "13px !important"
    },
    "& .makeStyles-BackFondo-20": {
      width: "120px !important",
      height: "120px !important"
    },
    "& .makeStyles-titleHome-17": {
      fontSize: "26px !important"
    },
    "& .makeStyles-textItems-21": {
      fontSize: "14px !important"
    }
  },
  root1: {
    ...defaultProps.root,
    "& .cont-res": {
      width: "100%",
      display: "grid",
      justifyContent: "center",
      alignItems: "center",
      gridTemplateColumns: "30% 27% 27% 16%",
      fontSize: 13
    }
  },
  root2: {
    ...defaultProps.root,
    "& .cards-List": {
      width: "180px !important"
    }
  }
}));
export default Layouts;
