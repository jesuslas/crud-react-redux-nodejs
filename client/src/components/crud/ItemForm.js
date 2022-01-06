import React, { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core/";
import { Button } from "@material-ui/core";
import { TextFields, tratarEmail, ResponseError } from "@appcrud/commons";
import {
  SelectItems,
  Errors,
  RenderLoading,
  MultiSelect
} from "@appcrud/commons";
import { createOrEdit } from "@appcrud/service";

const UserForm = props => {
  const {
    API,
    item,
    setHandleModalForm,
    setShowAlert,
    user,
    ROLE_ID,
    LABEL,
    ROWS,
    MODEL,
    tock,
    setTock,
    onClose,
    updatePost,
    addPost,
    delPost
  } = props;
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      if (item && item.id) {
        setValues({ ...values, ...item });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, item]
  );

  const onSubmit = async () => {
    try {
      setLoading(true);
      let properties = { ...values };
      if (item) {
        delete properties.createdAt;
        delete properties.cognitoId;
        delete properties.lastConnection;
      } else {
        properties = {
          ...properties,
          role_id: ROLE_ID
        };
      }

      await createOrEdit({
        API,
        MODEL: MODEL,
        properties,
        values: item || {},
        updatePost,
        addPost,
        setLoading,
        customHandler: () => {
          setValues({});
          setLoading(false);
          setTock(tock + 1);
          setHandleModalForm({ open: false });
          setShowAlert({
            open: true,
            message: `${LABEL} ${
              item ? "editado" : "creado"
            } Satisfactoriamente!`,
            type: "success",
            onClose: () => setShowAlert({ open: false })
          });
          setTock(tock + 1);
          setLoading(false);
        },
        setErrors
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setErrors(ResponseError(error));
      setLoading(false);
    }
  };
  const handleSubmitValidate = funct => {
    setErrors(undefined);
    if (values.email) {
      setValues({ ...values, email: tratarEmail(values.email) });
    }
    let error = undefined;
    ROWS.filter(item => item.require).forEach(item => {
      if (!values[item.schema] && !error) {
        error = `Campo ${item.col} es requerido`;
      }
    });
    if (error) {
      return setErrors(error);
    }
    setErrors(undefined);
    funct(values);
  };
  const renderForm = () => (
    <Box boxShadow={5}>
      <>
        <Box m={4}>
          <Box textAlign="center">
            <h3>
              {item ? "Editar" : "Crear"} {LABEL}
            </h3>
          </Box>
          <Grid container spacing={1}>
            {ROWS.filter(item => item.edit).map(
              (item, i) =>
                item.select ? (
                  item.selectMulti ? (
                    <Grid key={i} item md={6}>
                      <MultiSelect
                        {...{
                          personName: (values || {})[
                            item.selectMultiSchema
                          ] || [0],
                          values,
                          schema: item.selectMultiSchema,
                          setValues: setValues,
                          jsonData: item.datos,
                          placeholder: "seleccionar" + item.col,
                          checkList: false
                        }}
                      />
                    </Grid>
                  ) : (
                    <Grid key={i} item md={6}>
                      <SelectItems
                        {...{
                          label: item.col,
                          name: item.schema,
                          objectMenu: item.datos,
                          value: values[item.schema] || 0,
                          action: setValues,
                          isdisabled: item.isdisabled,
                          values,
                          confirmSelect: true,
                          marginBottom: { paddingTop: 10 }
                        }}
                      />
                    </Grid>
                  )
                ) : (
                  <Grid key={i} item md={6}>
                    <TextFields
                      {...{
                        label: item.col,
                        name: item.schema,
                        type: item.type,
                        values,
                        action: setValues,
                        value: values[item.schema] || ""
                      }}
                    />
                  </Grid>
                )
            )}
          </Grid>
          <Errors {...{ errors }} />
          {loading ? (
            <RenderLoading />
          ) : (
            <Grid container>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmitValidate(onSubmit)}
                >
                  {!item ? "Crear" : "Editar"}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={onClose}
                >
                  {"Cerrar"}
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </>
    </Box>
  );
  return renderForm();
};

export default UserForm;
