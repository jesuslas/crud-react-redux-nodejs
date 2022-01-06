import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { required, messageRequire, email } from "@appcrud/commons";
import { messageErrorLetra, messageErrorPhone } from "@appcrud/commons";
import { validateLetra, validatePhone } from "@appcrud/commons";
// export * from "./attributes";
const isNumber = require("is-number");
export const clearSearh = search => {
  Object.keys(search).reduce((all, i) => {
    if (!search[i] || search[i] === "") {
      return all;
    }
    return { ...all, [i]: search[i] };
  }, {});
};

export const hastRoles = (rolesContain = [], roles = [], res) => {
  let resRoles = undefined;
  let hasroles = roles.map(i => {
    if (i && i.usersRoles && i.usersRoles.priority === 1 && !resRoles) {
      resRoles = i.id;
    }
    return rolesContain.includes(i.id);
  });
  return res
    ? { result: hasroles.indexOf(true), rol: resRoles }
    : hasroles.indexOf(true) !== -1;
};

export const tratarEmail = text => {
  if (!text) {
    return "";
  }
  return text.toLowerCase().replace(/^\s+|\s+$|\s+(?=\s)/g, "");
};

export const resolveObj = (obj, path) => {
  path = path.split(".");
  var current = obj;
  while (path.length) {
    if (typeof current !== "object") {
      return undefined;
    }
    if (!current) {
      return undefined;
    }
    current = current[path.shift()];
  }
  return current;
};

const formatMoney = (number, decPlaces, decSep, thouSep) => {
  decSep = typeof decSep === "undefined" ? "." : decSep;
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  var sign = number < 0 ? "-" : "";
  var i = String(
    parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
  );
  let j = 0;
  j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    sign +
    (j ? i.substr(0, j) + thouSep : "") +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    (decPlaces
      ? decSep +
        Math.abs(number - i)
          .toFixed(decPlaces)
          .slice(2)
      : "")
  );
};
export const currencyFormat = value => {
  const number = parseFloat(value);
  if (!isNumber(number)) {
    return 0;
  }
  return formatMoney(number, 2, ",", ".");
};
export const isOwnersUpToDate = user => {
  if (!user) {
    return false;
  }
  if (hastRoles([2, 4, 5], user.roles)) {
    if (
      user.organizations &&
      user.organizations.length &&
      user.organizations[0].billings &&
      user.organizations[0].billings.length
    ) {
      let hasPay = false;
      user.organizations[0].billings.forEach(bill => {
        const diff = moment()
          .subtract(30, "days")
          .isSameOrBefore(moment(bill.date));
        if (diff) {
          hasPay = true;
        }
      });
      if (hasPay) {
        return true;
      }
      return false;
    }
  } else if (!hastRoles([2, 4, 5, 7], user.roles)) {
    return null;
  }
  return false;
};

export const completMenu = menu => {
  if (menu.length === 1) {
    return menu.map((item, i) => {
      item.active = i === 0 ? true : false;
      item.position = "only";
      return item;
    });
  } else {
    return menu.map((item, i) => {
      item.active = i === 0 ? true : false;
      item.position =
        i === 0 ? "left" : i + 1 === menu.length ? "right" : "center";
      return item;
    });
  }
};

const useStyles = makeStyles(() => ({
  root: {
    padding: "0px",
    "& .MuiOutlinedInput-inputMarginDense": {
      backgroundColor: "#FFF"
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: 8,
      marginBottom: 4
    },
    "& .MuiFormLabel-root": {
      color: "rgba(0, 0, 0, 0.87)"
    }
  },
  rootComplete: {
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
      fontSize: 16
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-marginDense": {
      color: "rgba(0, 0, 0, 0.87)"
    }
  }
}));
export const TextFields = ({
  name,
  label,
  type,
  action,
  subAction,
  customAction,
  defaultValue,
  multiline,
  rows,
  rowsMax,
  values,
  value,
  placeholder,
  required = true,
  variant = "outlined",
  autoFocus,
  maxLength = 250,
  size = "small",
  labelTop = true,
  disabled,
  style
}) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.root}
      disabled={disabled}
      label={labelTop ? label : undefined}
      labelPlacement={labelTop ? "top" : undefined}
      control={
        <TextField
          autoFocus={autoFocus}
          variant={variant}
          margin="normal"
          required={required}
          multiline={multiline}
          rowsMax={rowsMax}
          rows={rows}
          fullWidth
          id={name}
          name={name}
          type={type || "text"}
          autoComplete={name}
          placeholder={placeholder}
          onChange={({ target: { value, name } }) =>
            customAction
              ? customAction(name, value)
              : action({ ...values, [name]: value })
          }
          inputProps={{ maxLength, style: { fontSize: 16 } }}
          onKeyDown={subAction}
          defaultValue={defaultValue}
          value={value}
          size={size}
          label={labelTop ? undefined : label}
        />
      }
      style={style ? style : {}}
    />
  );
};
export const ComboBox = ({
  name,
  label,
  action,
  customAction,
  actionSelect,
  newData = false,
  values,
  placeholder,
  variant = "outlined",
  data = [],
  required = false,
  value
}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      className={classes.rootComplete}
      options={data}
      value={value}
      style={{ fontSize: 16 }}
      getOptionLabel={option =>
        option.title ? option.title : option.name ? option.name : option
      }
      freeSolo
      onChange={(event, newValue) => {
        if (newValue) {
          return !newData
            ? actionSelect({
                ...values,
                diaryInfo: {
                  ...(values || {}).diaryInfo,
                  [name]: newValue.title,
                  phoneNumber: newValue.phoneNumber,
                  email: newValue.email
                },
                userserviceForPetparentId: newValue.value,
                address: newValue.adress
              })
            : actionSelect(newValue);
        } else {
          actionSelect(null);
        }
      }}
      renderInput={params => {
        return (
          <TextField
            {...params}
            label={label}
            name={name}
            required={required}
            margin="normal"
            variant={variant}
            placeholder={placeholder}
            size={"small"}
            onChange={({ target: { value, name } }) =>
              customAction
                ? customAction(name, value)
                : action({ ...values, [name]: value })
            }
          />
        );
      }}
    />
  );
};

export const MinSel = (date, end) => {
  let min = date.getMinutes();
  let hours = date.getHours();
  if (min === 0) {
    date.setMinutes(0);
  }
  if (min > 0 && min <= 30) {
    date.setMinutes(30);
  }
  if (min > 30 && min <= 60) {
    date.setMinutes(0);
    date.setHours(hours + 1);
  }
  if (end && min > 30 && min <= 60) {
    date.setHours(hours + 2);
  } else if (end) {
    date.setHours(hours + 1);
  }
  return date;
};
export const groupBy = (xs, key) => {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
export const emailPetparent = (data, key) => {
  let petparent = {};
  if (data) {
    data = (data || {}).petParents;
    petparent = (data || []).find(
      e => e.usersPets && e.usersPets.relation === "PetParent"
    );
  }
  return data ? petparent[key] : "";
};

export const isRoleAdministrative = (data, value, bool) => {
  if (
    value &&
    data &&
    data.organizations &&
    data.organizations.length &&
    data.organizations[0] &&
    data.organizations[0].usersOrganizations &&
    data.organizations[0].usersOrganizations.role === value
  ) {
    return bool ? true : data.organizations[0].usersOrganizations.role;
  }
  return false;
};

export const arrayColor = [
  { color: "#174a7c" },
  { color: "#344352" },
  { color: "#ff9800" },
  { color: "#E96723" },
  { color: "#00234f" },
  { color: "#f44336" },
  { color: "#A91024" },
  { color: "#C18936" },
  { color: "#e3263f" },
  { color: "#4e75ac" }
];
export const getColor = key => {
  if (key === 0) {
    return "#174a7c";
  }
  if (key === 1) {
    return "#344352";
  }
  if (key === 2) {
    return "#ff9800";
  }
  if (key === 3) {
    return "#E96723";
  }
  if (key === 4) {
    return "#00234f";
  }
  if (key === 5) {
    return "#f44336";
  }
  if (key === 6) {
    return "#A91024";
  }
  if (key === 7) {
    return "#C18936";
  }
  if (key === 8) {
    return "#e3263f";
  }
  if (key === 9) {
    return "#4e75ac";
  }
  return "#174a7c";
};
export const isInvalidteUser = (_values, text = "", num = "", setErrors) => {
  let phone = (_values || {}).phone || (_values || {}).phoneNumber;
  if (required((_values || {}).firstName || "") === "Required") {
    setErrors(messageRequire(`nombre ${text ? text : ""}`));
    return true;
  } else if (validateLetra((_values || {}).firstName, 3, 120)) {
    setErrors(messageErrorLetra(`nombre ${text} ${num}`, 3, 120));
    return true;
  }

  if (required((_values || {}).lastName || "") === "Required") {
    setErrors(messageRequire(`apellido ${text} ${num}`));
    return true;
  } else if (validateLetra((_values || {}).lastName, 3, 120)) {
    setErrors(messageErrorLetra(`apellido ${text} ${num}`, 3, 120));
    return true;
  }

  if (required(phone || "") === "Required") {
    setErrors(messageRequire(`Teléfono ${text} ${num}`));
    return true;
  } else if (validatePhone(phone, 9, 9)) {
    setErrors(messageErrorPhone(`Teléfono ${text} ${num}`));
    return true;
  }

  if ((_values || {}).email && email((_values || {}).email || "") !== true) {
    setErrors(email((_values || {}).email));
    return true;
  }
  return false;
};

