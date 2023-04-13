import React, { useState } from 'react';
import { useField } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

/**
 * This is the custom component for password field
 * @param {*} - This component expect a name parameter and a label parameter
 * also accept all the parameters accepted by the default MUI TextField component
 * @returns a password field
 */
const PasswordFieldWrapper = ({ name, size, ...props }) => {
    const [field, meta] = useField(name);

    const [visible, setVisible] = useState(false);

    const configPasswordField = {
        ...field,
        ...props,
        fullWidth: true,
        size: size,
        type: visible ? 'text' : 'password',
    };

    if (meta && meta.touched && meta.error) {
        configPasswordField.error = true;
    }

    return (
        <>
            <FormControl
                variant="outlined"
                {...configPasswordField}
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

                        '&.Mui-focused.Mui-error fieldset': {
                            borderColor: '#FF4B55',
                        },
                        '&.Mui-error fieldset': {
                            borderColor: '#FF4B55',
                        },
                    },
                    '& label.Mui-focused': {
                        color: '#5b80ba',
                    },
                    '& label.Mui-error': {
                        color: '#FF4B55',
                    },
                }}
            >
                <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    {...configPasswordField}
                    endAdornment={
                        <InputAdornment position="end" onClick={() => setVisible(!visible)}>
                            <IconButton aria-label="toggle password visibility" edge="end">
                                {visible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {meta && meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
            </FormControl>
        </>
    );
};

export default PasswordFieldWrapper;
