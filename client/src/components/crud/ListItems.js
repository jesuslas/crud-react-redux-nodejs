import React, { useState, useEffect } from "react";
import Api from "../../services/api.service";
import { getData } from "@appcrud/service";
import { makeStyles } from "@material-ui/core/";
import { Table, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { RenderLoading, CustomPagination} from "@appcrud/commons";
import { ConfirmDialog, resolveObj } from "@appcrud/commons";
// import { responseError } from "@appcrud/commons";
import Box from "@material-ui/core/Box";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
export default function ListItems(props) {
  const {
    API,
    user,
    MODEL,
    ROWS,
    setShowAlert,
    search,
    setSearch,
    LABEL,
    TITLEDEL,
    setHandleModalForm,
    CUSTOMACTION,
    CUSTOMPROCESSDATA,
    tock,
    setTock,
    CUSTOMPAGINATION,
    JUSTLIST,
    DELETEABLE = true,
    ID,
    loadPost,
    posts,
    delPost
  } = props;
  const [items, setItems] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [/* errors, */ setErrors] = useState(undefined);
  const [confirmOpen, setconfirmOpen] = useState({ open: false });
  const [interval, setInterval] = useState(false);
  const [pagination, setPagination] = useState({
    itemsCount: 0,
    numberOfPages: 10,
    rowsPerPage: 40,
    page: 1,
    offset: 0,
    ...CUSTOMPAGINATION
  });
  const getItems = async () => {
    await getData({
      API,
      MODEL,
      customHandler: ({ rows: data, count: itemsCount }) => {
        if (data) {
          const keys = ROWS.map(i => i.schema);
          data = CUSTOMPROCESSDATA ? CUSTOMPROCESSDATA(data) : data;
          let result = data.map(item => {
            const row = keys.reduce((all, key) => {
              if (key.includes(".")) {
                const val = resolveObj(item, key);
                return { ...all, [key]: val || "" };
              }
              return { ...all, [key]: item[key] };
            }, {});
            return row;
          });
          setItems(result);
          const numberOfPages = Math.ceil(itemsCount / pagination.rowsPerPage);
          setPagination({ ...pagination, itemsCount, numberOfPages });
          loadPost(result)
        } else {
          setItems([]);
        }
      },
      setPagination,
      setLoading,
      setErrors,
      search: {
        limit: pagination.rowsPerPage,
        offset: pagination.offset,
        ...search
      },
      setShowAlert: setShowAlert,
      id: ID
    });
  };
  const ConfirmDelete = async row => {
    try {
      const ApiService = new Api(API);
      await ApiService.delete(MODEL, row.id);
      setconfirmOpen({ open: false });
      delPost(row.id);
      setTock(tock + 1);
    } catch (error) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.log("error", error);
    }
  };
  useEffect(
    () => {
      if (interval) {
        clearTimeout(interval);
      }
      if (tock===0) {
        const intervalId = setTimeout(() => getItems(), 1000);
        setInterval(intervalId);
      }else {
        setInterval(false);
      }
      if(tock>0){
        setItems(posts);
      }
      if(search && search.name){
        const searchPost = posts.filter(post=>post.name.includes(search.name))
        setItems(searchPost);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search, tock]
  );
  const classes = useStyles();

  const filterToDisplay = item => {
    const rows = ROWS.reduce(
      (all, i) => (i.show !== false ? [...all, i.schema] : all),
      []
    );
    return Object.keys(item).reduce(
      (all, k) => (rows.includes(k) ? [...all, item[k]] : all),
      []
    );
  };
  const getRowColor = (key, item) => {
    if (key % 2 === 0) {
      if (item.statusRow === null) {
        return classes.odd;
      } else if (item.statusRow === false) {
        return classes.oddfalse;
      } else if (item.statusRow === true) {
        return classes.oddtrue;
      }
      return classes.odd;
    }
    if (item.statusRow === null) {
      return classes.pointer;
    } else if (item.statusRow === false) {
      return classes.oddfalse2;
    } else if (item.statusRow === true) {
      return classes.oddtrue2;
    }
    return "";
  };

  return loading ? (
    <RenderLoading />
  ) : (
    <div>
      <h3>Número de Items {pagination && pagination.itemsCount}</h3>
      {/* <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table={MODEL}
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download Excel"
      /> */}
      <Table id={MODEL}>
        <Tbody>
          <Tr align="left">
            {ROWS.filter(i => i.show !== false).map(({ col }, i) => (
              <Th key={i}>{col}</Th>
            ))}
            {JUSTLIST ? null : <Th>Acciones</Th>}
          </Tr>
          {items.map((item, key) => (
            <Tr align="left" key={key} className={getRowColor(key, item)}>
              {filterToDisplay(item).map((rowName, i) => {
                return <Td key={i}>{rowName}</Td>;
              })}
              <Td align="center" className={classes.buttonStyle}>
                {loading ? (
                  <RenderLoading />
                ) : (
                  <>
                    {!ROWS.filter(item => item.edit).length ? null :(
                      <Tooltip
                        title={`Editar ${TITLEDEL}`}
                        placement="top-start"
                      >
                        <EditIcon
                          className={classes.button}
                          color="primary"
                          onClick={() =>
                            setHandleModalForm({
                              open: true,
                              item,
                              tock,
                              setTock
                            })
                          }
                        />
                      </Tooltip>
                    )}
                    {!DELETEABLE ? null :  (
                      <Tooltip title={`Borrar ${LABEL}`} placement="top-start">
                        <DeleteIcon
                          color="primary"
                          className={classes.button}
                          onClick={() => {
                            setconfirmOpen({
                              ...confirmOpen,
                              item,
                              open: true
                            });
                          }}
                        />
                      </Tooltip>
                    )}
          
                    {CUSTOMACTION &&
                      CUSTOMACTION({ item, user, tock, setTock })}
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {pagination.itemsCount < pagination.rowsPerPage ? null : (
        <Box color="white" justifyContent="center">
          <CustomPagination
            {...{
              numberOfPages: pagination.numberOfPages,
              page: pagination.page,
              onChangePage: (_, p2) => {
                setPagination({ ...pagination, page: p2 });
                setSearch({
                  ...search,
                  limit: pagination.rowsPerPage,
                  offset: pagination.rowsPerPage * (p2 - 1)
                });
              }
            }}
          />
        </Box>
      )}

      {!!confirmOpen.open ? (
        <ConfirmDialog
          title={""}
          open={confirmOpen.open}
          row={confirmOpen.item}
          setconfirmOpen={setconfirmOpen}
          loading={loading}
          ConfirmDelete={ConfirmDelete}
        >
          ¿Estás seguro de Eliminar al {TITLEDEL}
          {" " + (confirmOpen.item || {}).name + " "} ?
        </ConfirmDialog>
      ) : null}

    </div>
  );
}
const useStyles = makeStyles(() => ({
  odd: {
    background: "#efefef"
  },
  oddfalse: {
    background: "#ffdfdf"
  },
  oddfalse2: {
    background: "#d0b2b2"
  },
  oddtrue: {
    background: "#cdf3c9"
  },
  oddtrue2: {
    background: "#abc7a8"
  },
  button: {
    cursor: "pointer"
  },
  buttonStyle: {
    float: "center"
  },
  pointer: {
    cursor: "pointer"
  }
}));
