import * as React from "react";

//mui imports
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { NavigationButton } from "lib/components/Buttons/buttons";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";

/**
 * Custom modal component
 * @param {*} handleClose - function used to close the modal
 * @param {*} open - triggers the dialog to appear
 * @param {*} title - title of the modal
 * @param {*} buttonClose - close button
 * @param {*} buttonCloseLoading - loading state for close button
 * @param {*} buttonCloseDisabled - disable state for the close button
 * @param {*} onClickButtonClose - onClick function for close button
 * @param {*} buttonFinish - button finish, for an action such as finish or add(See the test with async-await behavior in '/testoc' page)
 * @param {*} buttonUtility - button for utility, such as deleting an item
 * @param {*} children - what is gonna be rendered in the modal
 * @param {*} maxWidth - represents the max width, can be set, i suggest the x% approach to make it responsive
 * @returns a custom popup dialog
 */
const CustomDialog = (props) => {
  const {
    setOpen,
    handleClose = () => {
      setOpen(false);
    },
    open = false,
    title = "",
    buttonClose = null,
    buttonCloseLoading = false,
    buttonCloseDisabled = false,
    onClickButtonClose = () => handleClose(),
    buttonFinish = null,
    buttonFinishLoading = false,
    buttonFinishDisabled = false,
    onClickButtonFinish = () => handleClose(),
    buttonUtility = null,
    buttonUtilityLoading = false,
    buttonUtilityDisabled = false,
    onClickButtonUtility = () => handleClose(),
    children,
    width = "auto",
    styles,
    maxWidth = "600px",
  } = props;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          width,
          maxWidth,
          borderRadius: "16px",
          paddingTop: "16px",
        },
        "& .MuiDialogActions-root": {
          paddingBottom: "16px",
          paddingTop: "0",
        },
        "& .MuiDialogContent-root": {
          paddingTop: "8px !important",
        },
        ...styles,
      }}
    >
      <DialogTitle
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingBottom: "8px",
          paddingTop: "0",
          fontSize: "14px",
          fontWeight: "600",
          color: "black",
          opacity: "62%",
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent>{children}</DialogContent>

      {(Boolean(buttonClose) !== null ||
        Boolean(buttonFinish) !== null ||
        Boolean(buttonUtility) != null) && (
        <DialogActions
          sx={{
            paddingX: "16px",
            justifyContent: buttonUtility ? "space-between" : "flex-end",
          }}
        >
          {Boolean(buttonUtility) && (
            <NavigationButton
              autoFocus
              color="red"
              startIcon={<DeleteIcon />}
              onClick={onClickButtonUtility}
              disabled={buttonUtilityDisabled}
              loading={buttonUtilityLoading}
            >
              {buttonUtility}
            </NavigationButton>
          )}

          <Stack direction="row">
            {Boolean(buttonClose) && (
              <NavigationButton
                autoFocus
                color="red"
                onClick={onClickButtonClose}
                disabled={buttonCloseDisabled}
                loading={buttonCloseLoading}
              >
                {buttonClose}
              </NavigationButton>
            )}

            {Boolean(buttonFinish) && (
              <NavigationButton
                autoFocus
                color="blue"
                onClick={onClickButtonFinish}
                disabled={buttonFinishDisabled}
                loading={buttonFinishLoading}
              >
                {buttonFinish}
              </NavigationButton>
            )}
          </Stack>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomDialog;
