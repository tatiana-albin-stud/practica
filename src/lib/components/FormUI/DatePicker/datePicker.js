import React from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

/**
 * This is the custom component for date picking
 * @param {*} - This component expect a name parameter and a label parameter
 * also accept al the parameters accepted by the default MUI TextField component
 * @returns a date picker
 */
const DatePickerWrapper = ({ name, size, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    setFieldValue(name, dayjs(event));
  };

  const configTextField = {
    ...field,
    ...props,
    size: size,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        size="small"
        label="For desktop"
        inputFormat="DD/MM/YYYY"
        {...configTextField}
        renderInput={(params) => (
          <TextField
            {...params}
            {...configTextField}
            sx={{
              fieldset: { borderRadius: "10px" },
              "& .MuiFormHelperText-root.Mui-error": {
                color: "#FF4B55",
              },
              "& .Mui-error": {
                color: "#FF4B55",
              },
              ".css-16jwpsg-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#FF4B55",
                },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#5b80ba",
                },
                "&.Mui-focused.Mui-error fieldset": {
                  borderColor: "#FF4B55",
                },
              },
              "& label.Mui-focused": {
                color: "#5b80ba",
              },
              "& label.Mui-error": {
                color: "#FF4B55",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerWrapper;
