import React from "react";

const Errors = props => {
  const { message, type } = props;
  const style = {
    error: {
      width: "95%",
      margin: "8px",
      fontWeight: "500",
      fontSize: "14px",
      textAlign: "center",
      color:
        type === "success" ? "#35e326" : type === "info" ? "#174a7c" : "#e3263f"
    }
  };

  return <div style={style.error}>{message}</div>;
};

export default Errors;
