import React, { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Grid, Box, Button, Typography } from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import Form from "./ItemForm";
// import { useHistory } from "react-router-dom";
import ListItems from "./ListItems";
import { /*HeadersTitle,*/ RenderLoading, EleccionButton } from "@appcrud/commons";
// import { hastRoles } from "../../commons/urils.commons";
export default function Items(props) {
  const {
    user,
    LABEL,
    // ACTION,
    TYPES,
    SEARCH,
    CUSTOMSEARCH,
    TYPESCHEMA,
    setShowAlert,
    ROWS,
    CREATEABLE = true,
    TITLEDEL,
    JUSTLIST
  } = props;
  const classes = useStyles();
  const [handleModalForm, setHandleModalForm] = useState({ open: false });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({ ...(CUSTOMSEARCH && CUSTOMSEARCH) });
  const [tock, setTock] = useState(0);
  // const history = useHistory();
  const [active, setActive] = useState(undefined);

  const SearchComp = ({ searchItem, i }) => (
    <Box key={i} p={1}>
      <TextField
        id={searchItem.label}
        label={`${searchItem.label}`}
        value={search[searchItem.schema]}
        onChange={({ target: { value } }) => {
          if (!value) {
            delete search[searchItem.schema];
            return setSearch({ ...search });
          }
          setSearch({
            ...search,
            [searchItem.schema]: value ? value : undefined
          });

        }}
      />
    </Box>
  );
  const paramsToObject = entries => {
    const result = {};
    for (const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  };
  const handleChangeBtn = type => {
    setActive(type);

    if (type === "all") {
      return setSearch({});
    }
    const urlParams = new URLSearchParams(
      TYPES.find(i => i.label === type).customQuery
    );
    const entries = urlParams.entries(); //returns an iterator of decoded [key,value] tuples
    const params = paramsToObject(entries); //{abc:"foo",def:"[asf]",xyz:"5"}

    setSearch({
      [TYPESCHEMA]: TYPES.find(i => i.label === type).value,
      ...(TYPES.find(i => i.label === type).customQuery && params)
    });
  };
  const filterToEdit = item => {
    if (!item) {
      return;
    }
    const rows = ROWS.reduce(
      (all, i) => (i.edit ? [...all, i.schema] : all),
      []
    );
    const res = Object.keys(item).reduce(
      (all, k) => (rows.includes(k) ? { ...all, [k]: item[k] } : all),
      {}
    );
    return { ...res, id: item.id };
  };
  return loading ? (
    <RenderLoading />
  ) : (
    <div className="spacingPad">
      <Typography
        {...{
          name: LABEL,
          // action: ACTION ? ACTION : () =>{}
        }}
      />
      <Fragment>
        {TYPES && (
          <div className={classes.contBtn}>
            <EleccionButton {...{ handleChangeBtn, active, options: TYPES }} />
          </div>
        )}
        <Box>
          <Box p={"0px 10px"} m={0}>
            {SEARCH.length ? "Buscar" : ""}
            <Box display="flex">
              {SEARCH.map((searchItem, i) =>
                SearchComp({ key: i, searchItem, i })
              )}
              {JUSTLIST ? null : !CREATEABLE ? null :  (
                <Box p={2}>
                  <Button
                    style={{ borderRadius: 10 }}
                    color="primary"
                    variant="contained"
                    onClick={() => setHandleModalForm({ open: true })}
                  >
                    Crear {LABEL}
                  </Button>
                </Box>
              )}
            </Box>
            <Grid container>
              <Dialog
                onClose={() => setHandleModalForm({ open: false })}
                aria-labelledby="customized-dialog-title"
                open={handleModalForm.open}
              >
                <Form
                  {...{
                    ...props,
                    item: filterToEdit(handleModalForm.item),
                    setHandleModalForm,
                    setShowAlert,
                    user,
                    LABEL,
                    TITLEDEL,
                    ...props,
                    ...handleModalForm,
                    tock,
                    setTock,
                    onClose: () => setHandleModalForm({ open: false })
                  }}
                />
              </Dialog>
            </Grid>
            <ListItems
              {...{
                ...props,
                loading,
                setLoading,
                search,
                setSearch,
                handleModalForm,
                setHandleModalForm,
                tock,
                setTock
              }}
            />
          </Box>
        </Box>
      </Fragment>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1
  },
  containerAsig: {
    width: "100%",
    display: "grid"
  },
  link: {
    cursor: "pointer"
  },
  subHeaders: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5px"
  },
  buttonStyle: {
    float: "center"
  },
  contBtn: {
    display: "flex",
    justifyItems: "center",
    margin: "20px 0px"
  }
}));
