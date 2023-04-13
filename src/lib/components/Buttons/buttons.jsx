import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DownloadIcon from "@mui/icons-material/Download";
import { LoadingButton } from "@mui/lab";

/**
 * The primary button component
 * @param {*} endIcon - the icon for the end of the button
 * @param {*} startIcon - the icon for the start of the button
 * @param {*} color - the color for the button and can be primary, secondary, dark, light
 * @returns a custom button
 */
export const PrimaryButton = ({
  children,
  endIcon = null,
  startIcon = null,
  color = "primary",
  onClick,
  style,
}) => {
  let setColor = color;
  let setTextColor = "#FFFFFF";
  let setHoverBackgroundColor = "#293f61";
  let setHoverColor = "#FFFFFF";

  //switch statement to set the color of the text, background, background and text when hover over the button

  switch (color) {
    case "primary":
      setColor = "#5B80BA";
      setHoverBackgroundColor = "#3d5e92";
      break;
    case "secondary":
      setColor = "#1860D2";
      setHoverBackgroundColor = "#12479d";
      break;
    case "dark":
      setColor = "#3E567C";
      setHoverBackgroundColor = "#2e405d";
      break;
    case "light":
      setColor = "#FFFFFF";
      setTextColor = "#5B80BA";
      setHoverBackgroundColor = "#5B80BA";
      setHoverColor = "#ffffff";
      break;
    default:
      setColor = "#5B80BA";
      setTextColor = "#FFFFFF";
      setHoverBackgroundColor = "#d8d8d8";
  }

  const defaultStyle = {
    borderRadius: "200px",
    padding: "13px 20px",
    backgroundColor: setColor,
    color: setTextColor,
    justifyContent: "center",
    boxShadow: "#eaeef4 0px 4px 16px, #eaeef1 0px 8px 32px",

    whiteSpace: "nowrap",
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    fontSize: "14px",
    fontWeight: 600,
    fontStyle: "normal",
    minWidth: "auto",

    "&:hover": {
      backgroundColor: setHoverBackgroundColor,
      color: setHoverColor,
    },
    "& .MuiButton-startIcon": {
      marginBottom: "0px",
    },
    "& .MuiButton-endIcon": {
      marginBottom: "0px",
    },
  };

  return (
    <Button
      sx={{ ...defaultStyle, ...style }}
      variant="contained"
      startIcon={startIcon && startIcon}
      endIcon={endIcon && endIcon}
      size="large"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

/**
 * The navigation button component
 * @param {*} endIcon - the icon for the end of the button
 * @param {*} startIcon - the icon for the start of the button
 * @param {*} color - can be red, green, grey, blue or black. When using variant contained it can only be white.
 * @param {*} variant - can be text and contained. Text variant is used for navigation. Contained is used for the final step in a navigation, for example Save button.
 * @returns a custom button
 */

export const NavigationButton = ({
  children,
  endIcon = null,
  startIcon = null,
  variant = "text",
  onClick,
  color,
  disabled,
  loading,
  fontSize = "13px",
}) => {
  let setColor = "#616161";
  let setHoverBackgroundColor;

  switch (color) {
    case "red":
      setColor = "#F23B2F";
      setHoverBackgroundColor = "#FF4B551A";
      break;
    case "green":
      setColor = "#009C10";
      setHoverBackgroundColor = "#009C101A";
      break;
    case "blue":
      setColor = "rgba(91, 128, 186, 1)";
      setHoverBackgroundColor = "rgba(223, 234, 255, 1)";
      break;
    case "grey":
      setColor = "rgba(0, 0, 0, 0.3)";
      setHoverBackgroundColor = "rgba(250, 250, 250, 1)";
      break;
    case "black":
      setColor = "#616161";
      break;
    default:
      setColor = "#616161";
  }

  return (
    <LoadingButton
      sx={{
        borderRadius: "19px",
        padding: "6.8px 20.5px", //necessary to recrate the padding of the contained version. Padding(or line-height in our case) is missing due to line-height being 0.
        color: variant === "text" ? setColor : "white",
        backgroundColor: variant === "contained" && "#5A7FBA",
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: fontSize,
        fontWeight: 600,
        fontStyle: "normal",

        "&:hover": {
          backgroundColor: setHoverBackgroundColor,
        },
        "& .MuiButton-startIcon": {
          marginBottom: "0px",
        },
        "& .MuiButton-endIcon": {
          marginBottom: "0px",
        },
        "& .MuiLoadingButton-loadingIndicator": {
          color: "#5B80BA",
        },
        "&:disabled": { color: "rgba(0, 0, 0, 0.3)" },
      }}
      disabled={disabled}
      loading={loading}
      variant={variant}
      startIcon={startIcon && startIcon}
      endIcon={endIcon && endIcon}
      onClick={onClick}
    >
      {children}
    </LoadingButton>
  );
};

/**
 * The utility button
 * @param {*} endIcon - the icon at the end of the button
 * @param {*} startIcon - the icon at the end of the button
 * @param {*} variant - can be outlined and contained. Outlined variant is used for example for activate client, add phone etc. Contained is used for create account or modify for example...
 * @param {*} color - can be red, blue, green. When using contained variant it can only be blue
 * @param {*} width - set the width of the button
 * @param {*} height - set the height of the button
 * @param {*} disable - disable the button
 * @returns a custom button
 */
export const UtilityButton = ({
  children,
  endIcon = null,
  startIcon = null,
  variant = "outlined",
  color = "#5B80BA",
  onClick = null,
  disabled = false,
  type = null,
  style,
}) => {
  let setColor = color;
  let setHoverBackgroundColor = "#DFEAFF";

  //switch statement to set the color of the background, border, background and border when hover over the button.
  switch (color) {
    case "blue":
      setColor = "#5B80BA";
      setHoverBackgroundColor = "#DFEAFF";
      break;
    case "red":
      setColor = "#FF4B55";
      setHoverBackgroundColor = "#FF4B551A";
      break;
    case "green":
      setColor = "#009C10";
      setHoverBackgroundColor = "#009C101A";
      break;
    default:
      setColor = "#5B80BA";
      setHoverBackgroundColor = "#DFEAFF";
  }

  const defaultStyle = {
    backgroundColor: variant === "contained" && "#5B80BA",
    color: variant === "outlined" && setColor,
    borderColor: variant === "outlined" && setColor,
    borderRadius: "8px",
    whiteSpace: "nowrap",
    textTransform: "none",
    fontSize: "14px",
    padding: "6px 14px", //necessary to recrate the padding of the contained version. Padding(or line-height in our case) is missing due to line-height being 0.
    "&:hover": {
      backgroundColor: variant === "outlined" && setHoverBackgroundColor,
      borderColor: variant === "outlined" && setColor,
    },
    "&:disabled": {
      color: "#0000004D",
      borderColor: "#0000004D",

      "& .MuiLoadingButton-loadingIndicator": {
        color: "#5B80BA",
      },
    },
    "& .MuiButton-startIcon": {
      marginBottom: "0px",
    },
    "& .MuiButton-endIcon": {
      marginBottom: "0px",
    },
  };

  return (
    <Button
      disabled={disabled}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      type={type && type}
      sx={{ ...defaultStyle, ...style }}
    >
      {children}
    </Button>
  );
};

/**
 * The General administration button component
 * @param {*} text - the text to be displayed
 * @param {*} icon - the icon to be displayed. It only accepts svg
 * @returns a custom button
 */
export const GeneralAdministrationButton = ({ onClick, text, icon }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        boxShadow: "0px 1px 2px rgba(36, 36, 36, 0.25)",
        borderRadius: "20px",
        backgroundColor: "#FFFFFF",
        color: "#8E99A7",
        textTransform: "none",
        transitionDuration: "0.4s",
        cursor: "auto",

        "&:hover": {
          backgroundColor: "#5B80BA",
          color: "#fff",

          ".button-content-wrapper": {
            "svg path": {
              fill: "#ffffff",
            },
          },
        },
      }}
    >
      <div className="button-content-wrapper">
        {icon}
        <h1>{text}</h1>
      </div>
    </Button>
  );
};

/**
 * The Small general administration button component
 * @param {*} text - the text to be displayed
 * @param {*} icon - the icon to be displayed. It only accepts svg
 * @returns a custom button
 */
export const SmallGeneralAdministrationButton = ({ onClick, text, icon }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        boxShadow: "0px 1px 2px rgba(36, 36, 36, 0.25)",
        borderRadius: "20px",
        backgroundColor: "#FFFFFF",
        color: "#8E99A7",
        textTransform: "none",
        transitionDuration: "0.4s",

        "&:hover": {
          backgroundColor: "#5B80BA",
          color: "#fff",

          ".small-button-content-wrapper": {
            "svg path": {
              fill: "#ffffff",
            },
          },
        },
      }}
    >
      <div className="small-button-content-wrapper">
        {icon}
        <h1>{text}</h1>
      </div>
    </Button>
  );
};

/**
 * The Technical support button component
 * @param {*} startIcon - the icon at the start of the button
 * @returns a custom button
 */
export const TechnicalSupportButton = ({
  onClick,
  startIcon,
  children,
  color,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: color ? color : "#869DB6",
        borderRadius: "20px",
        boxShadow: "0px 5px 15px rgba(35, 78, 140, 0.1)",
        width: "205px",
        height: "45px",
        display: "flex",
        margin: "15px 15px 0 15px",
        textTransform: "none",
      }}
      onClick={onClick}
      startIcon={startIcon && startIcon}
    >
      {children}
    </Button>
  );
};

export const ActionButton = ({ onClick, color, children }) => {
  let setColor = "#5B80BA";
  let setHover = "#293f61";
  switch (color) {
    case "blue":
      setColor = "#5B80BA";
      setHover = "#293f61";
      break;
    case "red":
      setColor = "#FF4B55";
      setHover = "#a50009";
      break;
    case "green":
      setColor = "#009C10";
      setHover = "#004e08";
      break;
    default:
      setColor = "#5B80BA";
      setHover = "#293f61";
  }
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: setColor,
        color: "#FFFFFF",
        borderRadius: "1.25rem",
        paddingX: "10px",
        textTransform: "none",
        whiteSpace: "nowrap",

        "&:hover": {
          backgroundColor: setHover,
        },
      }}
    >
      {children}
    </Button>
  );
};

export const ModifySmallButton = ({ onClick, children, disabled }) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant="outlined"
      sx={{
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontWeight: 600,
        fontSize: "12px",
        color: "#5B80BA",
        border: "1px solid #5B80BA",
        borderRadius: "36px",
        paddingX: "10px",
        height: "23px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Button>
  );
};

export const DuplicateButton = ({ onClick }) => {
  return (
    <IconButton
      aria-label="duplicate"
      sx={{ "&:hover": { color: "#1860D2" } }}
      onClick={onClick}
    >
      <ContentCopyIcon />
    </IconButton>
  );
};

export const EditButton = ({ onClick, color }) => {
  return (
    <IconButton
      aria-label="edit"
      sx={{ "&:hover": { color: color ? color : "#009C10" } }}
      onClick={onClick}
    >
      <EditIcon />
    </IconButton>
  );
};

export const RemoveButton = ({ onClick }) => {
  return (
    <IconButton
      aria-label="delete"
      sx={{ "&:hover": { color: "#FF0000" } }}
      onClick={onClick}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export const ConfirmButton = ({ onClick }) => {
  return (
    <IconButton
      aria-label="confirm"
      sx={{ "&:hover": { color: "#009C10" } }}
      onClick={onClick}
    >
      <CheckCircleIcon />
    </IconButton>
  );
};

export const DatePickerButton = ({ onClick }) => {
  return (
    <IconButton
      aria-label="date"
      sx={{ "&:hover": { color: "#1860D2" } }}
      onClick={onClick}
    >
      <CalendarMonthIcon />
    </IconButton>
  );
};

export const DownloadButton = ({ onClick }) => {
  return (
    <IconButton
      aria-label="date"
      sx={{ "&:hover": { color: "#1860D2" } }}
      onClick={onClick}
    >
      <DownloadIcon />
    </IconButton>
  );
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const EditClientButton = ({
  children,
  variant = "outlined",
  color = "#5B80BA",
  width = null,
  height = null,
  onClick = null,
  disabled = false,
  type = null,
}) => {
  let setColor = color;
  let setHoverBackgroundColor = "#DFEAFF";

  //switch statement to set the color of the background, border, background and border when hover over the button.
  switch (color) {
    case "blue":
      setColor = "#5B80BA";
      setHoverBackgroundColor = "#DFEAFF";
      break;
    default:
      setColor = "#5B80BA";
      setHoverBackgroundColor = "#DFEAFF";
  }

  return (
    <Button
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      type={type}
      sx={{
        backgroundColor: variant === "contained" && "#5B80BA",
        color: variant === "outlined" && setColor,
        borderColor: variant === "outlined" && setColor,
        borderRadius: "20px",
        width: width,
        height: height,
        textTransform: "none",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: variant === "outlined" && setHoverBackgroundColor,
          borderColor: variant === "outlined" && setColor,
        },
        "&:disabled": {
          color: "#0000004D",
          borderColor: "#0000004D",
        },
      }}
    >
      {children}
    </Button>
  );
};
