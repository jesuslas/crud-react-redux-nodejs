import React from "react";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const EleccionButton = props => {
  const { handleChangeBtn, active, options } = props;
  return (
    <Grid container justify="center">
      <Grid item style={{ textAlign: "center" }}>
        <Button
          type="submit"
          variant={"text"}
          color={active === "all" ? "primary" : "secondary"}
          onClick={() => handleChangeBtn("all")}
        >
          {"Todos"}
        </Button>
      </Grid>
      {options.map(({ label }, i) => (
        <Grid
          key={i}
          item
          // xs={12 / options.length}
          style={{ textAlign: "center" }}
        >
          <Button
            type="submit"
            variant={"text"}
            color={active === label ? "primary" : "secondary"}
            onClick={() => handleChangeBtn(label)}
          >
            {label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default EleccionButton;
