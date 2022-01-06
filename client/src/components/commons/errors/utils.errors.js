export const responseError = error => {
  // eslint-disable-next-line no-console
  console.log("error", error);
  try {
    if (
      error.message &&
      error.message.includes("Esta hora ya no esta disponible.")
    ) {
      return error.message;
    }
    if (error.response && error.response.data.description) {
      return [
        "This user already exists, contact the administrator",
        "This user already exists"
      ].includes(error.response.data.description)
        ? "El correo electrónico ya está siendo usado en otra cuenta, utiliza otro correo o contáctate con tu ejecutivo de soporte Pawiis."
        : "Hubo un error";
    }
    if (error.response && error.response.data.description) {
      return error.response.data.description.includes("this hour is busy")
        ? "Esta hora ya no esta disponible."
        : "Hubo un error";
    }

    if (error.response && error.response.data.msg) {
      const erro = error.response.data.msg.includes("Not Found")
        ? "No se encontro la ruta"
        : error.response.data.msg;
      return erro;
    }
    if (error.response && error.response.data && error.response.data.code) {
      let erro =
        error.response.data.code === "UsernameExistsException"
          ? "Ya existe un usuario con el mismo correo"
          : error.response.data.message && error.response.data.message;
      return erro;
    }

    if (
      error.response &&
      error.response.data &&
      error.response.data.length &&
      error.response.data[0].original.sqlMessage
    ) {
      return error.response.data.original.sqlMessage;
    }

    if (
      error.response &&
      error.response.data &&
      error.response.data.errors.length
    ) {
      let erro = "";
      if (error.response.data.errors[0].message) {
        erro = error.response.data.errors[0].message.includes(
          "users.email must be unique"
        )
          ? "Ya existe un usuario con el mismo correo"
          : error.response.data.errors[0].message;
      }
      if (error.response.data.errors[0].msg) {
        erro = error.response.data.errors[0].msg;
      }
      return erro;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return "Hubo un error";
  }
};
