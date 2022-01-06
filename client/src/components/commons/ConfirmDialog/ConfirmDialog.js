import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import RenderLoading from "../../commons/loading/loading";

const ConfirmDialog = props => {
  const {
    title,
    children,
    open,
    ConfirmDelete,
    confirmOpen,
    setconfirmOpen,
    row,
    loading,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={() =>
        setconfirmOpen({
          ...confirmOpen,
          [`${row.id}`]: false
        })
      }
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {loading ? (
          <RenderLoading />
        ) : (
          <>
            {" "}
            <Button
              variant="contained"
              onClick={() => {
                setconfirmOpen({
                  ...confirmOpen,
                  [`${row.id}`]: false
                });
              }}
              color="default"
            >
              No
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                ConfirmDelete(row);
              }}
              color="secondary"
            >
              Si
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
