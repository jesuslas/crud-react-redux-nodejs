import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function CustomPagination(props) {
  const { numberOfPages = 10, page = 1, onChangePage } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        count={numberOfPages}
        defaultPage={page}
        page={page}
        onChange={onChangePage}
      />
    </div>
  );
}
