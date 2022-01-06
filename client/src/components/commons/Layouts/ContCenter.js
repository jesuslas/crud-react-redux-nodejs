import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";

const ContCenter = ({ children, bg }) => {
  const user = useSelector(state => state.user);
  const sizeSmall = useMediaQuery("max-width:730px");
  const useStyles = makeStyles(() => ({
    compcenter: {
      width: "100%",
      maxWidth: sizeSmall
        ? undefined
        : (user || {}).views === "Desktop"
          ? undefined
          : 730,
      "& .spacingPad": {
        padding: (user || {}).views === "Desktop" ? "0px 20px" : undefined
      }
    }
  }));
  const classes = useStyles();
  useEffect(() => {}, [user]);
  return (
    <center>
      <div className="responsive" style={{ backgroundColor: bg, margingTop:10 }}>
        <div className={classes.compcenter}>{children}</div>
      </div>
    </center>
   
  );
};

export default ContCenter;
