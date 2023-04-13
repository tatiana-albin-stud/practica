import React from 'react';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

/**
 * This is the custom component for the select component
 * @param {*} - the component expect a name parameter and a label parameter
 * @returns a select component
 */
const SelectWrapper = ({ children, name, size, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (event) => {
        const { value } = event.target;
        setFieldValue(name, value);
    };

    const configSelect = {
        ...field,
        ...props,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        size: size,
        onChange: handleChange,
    };

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField
            {...configSelect}
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
                '.css-1ej3jo2-MuiButtonBase-root-MuiMenuItem-root.Mui-selected': {
                    backgroundColor: 'rgb(91 128 186 / 25%)',
                },
            }}
        >
            {children.map((chil) => ({
                ...chil,
                props: {
                    ...chil.props,
                    sx: {
                        '&.Mui-selected': {
                            backgroundColor: '#5b80ba61',
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: '#5b80ba85',
                        },
                    },
                },
            }))}
        </TextField>
    );
};

export default SelectWrapper;
