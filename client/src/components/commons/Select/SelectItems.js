import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const SelectItems = ({
  action,
  customAction,
  label,
  name,
  defaultName,
  confirmSelect,
  specialSelect,
  defaultSelect,
  values,
  itemsMenu,
  objectMenu,
  value,
  isBoolean,
  marginBottom,
  maxLimite,
  component
}) => {
  const classes = useStyles();
  const matchesSmall = useMediaQuery("(max-width: 400px)");
  return (
    <div className={maxLimite && matchesSmall ? classes.limiteXS : null}>
      {marginBottom ? (
        <InputLabel id={label} style={marginBottom}>
          {label}
        </InputLabel>
      ) : (
        <InputLabel id={label}>{label}</InputLabel>
      )}
      <Select
        labelId={label}
        id={name}
        name={name}
        required
        value={value}
        fullWidth
        inputProps={{ style: { fontSize: 16 } }}
        onChange={({ target: { value, name } }) => {
          customAction
            ? customAction(name, value)
            : action({
                ...values,
                [name]: value === "Seleccionar" ? undefined : value
              });
        }}
        input={
          specialSelect ? (
            <SpecialSelect />
          ) : confirmSelect ? (
            <NewSelect />
          ) : defaultSelect ? (
            <DefaultSelect />
          ) : (
            <NewSelect />
          )
        }
      >
        <MenuItem disabled={true} value={0} style={{ fontSize: "1rem" }}>
          {defaultName ? defaultName : "Seleccionar"}
        </MenuItem>
        {itemsMenu
          ? itemsMenu.map((e, i) => {
              return (
                <MenuItem
                  key={i}
                  style={{ fontSize: "1rem" }}
                  id={`${name}${e}`}
                  value={isBoolean ? (e === "Si" ? true : false) : e}
                >
                  {e}
                </MenuItem>
              );
            })
          : objectMenu
            ? objectMenu.map(
                ({ label, name, description, minutes, value }, i) => {
                  return (
                    <MenuItem
                      style={
                        defaultSelect
                          ? { whiteSpace: "normal", fontSize: "1rem" }
                          : { fontSize: "1rem", whiteSpace: "normal" }
                      }
                      key={i}
                      value={value}
                    >
                      {component ? (
                        <p style={{ padding: 0, margin: 0, fontSize: "1rem" }}>
                          <span style={{ fontWeight: "bold" }}> {name} </span>
                          {description ? (
                            <span
                              style={{
                                fontWeight: "bold",
                                wordBreak: "break-word"
                              }}
                            >
                              {` -  ${description}.`}
                            </span>
                          ) : null}
                          {minutes ? (
                            <span style={{ fontStyle: "italic" }}>
                              {" Servicio de"} {minutes} {" minutos."}
                            </span>
                          ) : null}
                        </p>
                      ) : (
                        <span>{label}</span>
                      )}
                    </MenuItem>
                  );
                }
              )
            : null}
      </Select>
    </div>
  );
};

const NewSelect = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: 8,
      marginBottom: 4
    },
    "& .MuiSelect-icon": {
      color: "rgba(0, 0, 0, 0.87)"
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#FFF",
    color: "rgba(0, 0, 0, 0.87)",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Source Sans Pro font.
    fontFamily: ["Source Sans Pro", "sans-serif"].join(",")
  }
}))(InputBase);

const SpecialSelect = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: 0,
      marginBottom: 0
    },
    "& .MuiSelect-icon": {
      color: "rgba(0, 0, 0, 0.87)"
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#FFF",
    color: "rgba(0, 0, 0, 0.87)",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Source Sans Pro font.
    fontFamily: ["Source Sans Pro", "sans-serif"].join(",")
  }
}))(InputBase);

const DefaultSelect = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: 8,
      marginBottom: 4
    },
    "& .MuiSelect-icon": {
      color: "rgba(0, 0, 0, 0.87)"
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#FFF",
    color: "rgba(0, 0, 0, 0.87)",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Source Sans Pro font.
    fontFamily: ["Source Sans Pro", "sans-serif"].join(",")
  }
}))(InputBase);

const useStyles = makeStyles(() => ({
  limiteXS: {
    "& .MuiSelect-selectMenu": {
      maxWidth: 260
    }
  }
}));

export default SelectItems;
