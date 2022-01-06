import validator from "validator";
import moment from "moment";

export const required = value => (value ? true : "Required");
export const email = value =>
  validator.isEmail(value) ? true : "Correo no es valido";
export const minLength = (value, field, length = 8) =>
  (value || "").length >= length
    ? true
    : `Campo ${field} debe tener al menos ${length} caracteres`;
export const maxLength = (value, length = 160) => (value || "").length > length;
export const requireMessage = field => `Campo de ${field} es requerido`;

export const messages = {
  requireEmail: "Campo de correo es requerido",
  requirePassword: "Campo de contraseña es requerido",
  requireCode: "Campo de código es requerido",
  minLength: "Campo tiene que tener almenos 8 caráteres"
};
export const messageTranslate = (key, name) => {
  const trans = {
    "Field is require": `El campo ${name} es obligatorio.`,
    NotAuthorizedException: ` ${name} incorrectos.`,
    ExpiredCodeException:
      "Se proporcionó un código no válido. Vuelva a solicitar un código.",
    CodeMismatchException:
      "Se proporcionó un código de verificación no válido. Vuelva a intentarlo.",
    InvalidPasswordException: "La contraseña no cumple con la política"
  };
  return trans[key] || key;
};
export const messageRequire = field => `Campo ${field} es requerido`;
export const messageErrorLetra = (field, min, max) =>
  `Campo ${field} debe tener de ${min} a ${max} caracteres alfabéticos.`;
export const messageErrorPhone = field =>
  `Campo ${field} debe tener 9 números (9 1234 1234).`;
export const messageErrorRut = field => `Campo ${field} invalido.`;
export const messageErrorLengthNumber = (field, min, max) =>
  `Campo ${field} debe tener de ${min ? min : 1} a ${
    max ? max : 20
  } caracteres numéricos.`;
export const messageErrorLength = (field, min, max) =>
  `Campo ${field} debe tener de ${min ? min : 3} a ${
    max ? max : 20
  } caracteres.`;

export const isAutenticate = user => {
  if (user && user.username) {
    return true;
  }
  return false;
};





export const capitalizeFLetter = string => {
  return string
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};



export const validateLetra = (e, min, max) => {
  const caracteres = /[a-zA-Z0-9&._-]/;
  if (!caracteres.test(e)) {
    return true;
  } else if (e.length < min || e.length > max) {
    return true;
  }
  return false;
};
export const validateLength = (e, min, max) => {
  if (e && min && max) {
    if (e.length < min || e.length > max) {
      return true;
    }
  }

  return false;
};
export const validatePhone = (e, min, max) => {
  e = e.replace(/\D+/g, "");
  const caracteres = /^[0-9]+$/;
  if (!caracteres.test(e)) {
    return true;
  } else if (e.length < min || e.length > max) {
    return true;
  }
  return false;
};

export const passwordMatch = values =>
  values.password !== values.passwordMatch
    ? "Las contraseñas deben coincidir"
    : true;

export const dateFormat = (value, formato) => {
  moment.updateLocale("es", {
    months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_"
    ),
    monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
      "_"
    ),
    weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
    weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
    weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
  });
  // moment.updateLocale('es');
  if (formato === "h:mm a") {
    let time = moment(value).format(formato);
    return time;
  } else if (formato) {
    return moment(value).format(formato);
  }
  return moment(value).format("DD/MM/YY");
};

export const changeColor = date => {
  const score = moment().diff(moment(date), "days");
  if (score > -1) {
    return "#e3263f";
  }
  if (score <= -1 && score >= -4) {
    return "#e96723";
  }
  if (score <= -5 && score >= -7) {
    return "#EFA707";
  }
  if (score <= -8) {
    return "#174A7C";
  }
  return "#7d385e";
};
