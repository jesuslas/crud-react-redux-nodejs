import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { getColor } from "../urils.commons";

const MultiSelect = props => {
  const {
    personName,
    setPersonName,
    jsonData,
    getSchedules,
    setValues,
    values,
    schema
  } = props;
  const { checkList = true, placeholder = "Otros Calendarios" } = props;
  const [changeOpen, setChangeOpen] = React.useState(false);
  const [interval, setInterval] = React.useState(false);
  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: checkList ? theme.spacing(1) : 0,
      width: "100%",
      minWidth: 120,
      maxWidth: checkList ? 300 : undefined,
      "& .defaulLabel": {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontStyle: "inherit"
      },
      "& .MuiSelect-select": {
        padding: "10px 26px 10px 12px",
        "&:focus": {
          borderRadius: 5
        }
      }
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2,
      height: 20
    }
  }));
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };
  const handleChange = event => {
    if (interval) {
      clearTimeout(interval);
    }
    setValues && setValues({ ...values, [schema]: event.target.value });
    setPersonName && setPersonName(event.target.value);
    const intervalId = setTimeout(() => {
      getSchedules && getSchedules(event.target.value);
      setChangeOpen(false);
    }, 1000);
    setInterval(intervalId);
  };
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        displayEmpty
        value={personName}
        onChange={handleChange}
        open={changeOpen}
        onOpen={() => setChangeOpen(true)}
        onClose={() => setChangeOpen(false)}
        input={<NewSelect />}
        renderValue={selected => {
          if (selected.length === 0) {
            return <em className="defaulLabel">{placeholder}</em>;
          }
          let data = jsonData
            .filter(i => selected.includes(i.value))
            .map(i => i.label);
          return data.join(", ");
        }}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
          <em className="defaulLabel">{placeholder}</em>
        </MenuItem>
        {jsonData.map((items, i) => (
          <MenuItem key={i} value={items.value}>
            <Checkbox
              checked={personName.indexOf(items.value) > -1}
              style={checkList ? { color: getColor(i) } : { color: "#174A7C" }}
            />
            <ListItemText primary={items.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Source Sans Pro font.
    fontFamily: ["Source Sans Pro", "sans-serif"].join(",")
  }
}))(InputBase);

export default MultiSelect;
