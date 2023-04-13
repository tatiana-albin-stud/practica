import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

/**
 * This is the custom component for text field
 * @param {*} - This component expect a name parameter and a label parameter
 * also accept all the parameters accepted by the default MUI TextField component
 * @returns a text field
 */
const TextFieldWrapper = ({ name, size, ...props }) => {
    const [field, meta] = useField(name);

    const configTextField = {
        ...field,
        ...props,
        fullWidth: true,
        variant: 'outlined',
        size: size,
    };

    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return (
        <TextField
            {...configTextField}
            sx={{
                fieldset: { borderRadius: '10px' },
                '& .MuiFormHelperText-root.Mui-error': {
                    color: '#FF4B55',
                },
                '& .Mui-error': {
                    color: '#FF4B55',
                },
                '.css-16jwpsg-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF4B55',
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: '#5b80ba',
                    },
                },
                '& label.Mui-focused': {
                    color: '#5b80ba',
                },
                '& label.Mui-error': {
                    color: '#FF4B55',
                },
            }}
        />
    );
};

export default TextFieldWrapper;
