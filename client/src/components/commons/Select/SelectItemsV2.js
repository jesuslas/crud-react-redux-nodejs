import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { fontFamily } from "../../../config/config";

const SelectItems = ({
  action,
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
  maxLimite
}) => {
  const classes = useStyles();
  const matchesSmall = useMediaQuery("(max-width:500px)");
  return (
    <div className={maxLimite && matchesSmall ? classes.limiteXS : null}>
      <Select
        labelId={label}
        id={name}
        name={name}
        required
        value={value}
        fullWidth
        onChange={({ target: { value } }) => {
          action({
            ...values,
            [name]: itemsMenu
              ? value === label
                ? undefined
                : value
              : value.value === label
                ? undefined
                : value
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
            <BootstrapInput />
          )
        }
      >
        <MenuItem value={0}>{defaultName ? defaultName : label}</MenuItem>
        {itemsMenu
          ? itemsMenu.map((e, i) => {
              return (
                <MenuItem
                  key={i}
                  value={isBoolean ? (e === "Si" ? true : false) : e}
                  id={`${name}${e}`}
                >
                  {e}
                </MenuItem>
              );
            })
          : objectMenu
            ? objectMenu.map(({ label, value }, i) => {
                return (
                  <MenuItem key={i} value={value}>
                    {label}
                  </MenuItem>
                );
              })
            : null}
      </Select>
    </div>
  );
};

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    },
    "& .MuiSelect-icon": {
      width: "1.9rem",
      height: "2.5rem",
      right: "0.3rem",
      top: "calc(50% - 22px)",
      color: "#000"
    }
  },
  input: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    color: "#00000080",
    borderRadius: 4,
    fontSize: 16,
    padding: "8px 26px 7px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [fontFamily].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const NewSelect = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: 5
    },
    "& .MuiSelect-icon": {
      color: "#efa707"
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "transparent",
    color: "#efa707",
    borderBottom: "1px solid #efa707",
    fontSize: 16,
    padding: "8px 26px 7px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Source Sans Pro font.
    fontFamily: [fontFamily].join(",")
  }
}))(InputBase);

const SpecialSelect = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: 5
    },
    "& .MuiSelect-icon": {
      color: "#174a7c"
    }
  },
  input: {
    position: "relative",
    backgroundColor: "transparent",
    color: "#174a7c",
    borderBottom: "1px solid #174a7c",
    fontSize: 16,
    padding: "8px 26px 7px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Source Sans Pro font.
    fontFamily: [fontFamily].join(",")
  }
}))(InputBase);

const DefaultSelect = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: 5
    },
    "& .MuiSelect-icon": {
      color: "#808080"
    },
    "& .MuiSelect-select:focus": {
      borderRadius: 0,
      backgroundColor: "#00000000"
    }
  },
  input: {
    position: "relative",
    backgroundColor: "transparent",
    color: "#808080",
    borderBottom: "1px solid #808080",
    fontSize: 16,
    padding: "8px 26px 7px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Source Sans Pro font.
    fontFamily: [fontFamily].join(",")
  }
}))(InputBase);

const useStyles = makeStyles(() => ({
  limiteXS: {
    "& .MuiSelect-selectMenu": {
      maxWidth: 150
      //top: -6
    }
  }
}));

export default SelectItems;
