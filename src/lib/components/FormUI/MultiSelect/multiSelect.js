import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useField, useFormikContext } from 'formik';

/**
 * This is the custom component for the multi-select component
 * @param {*} - the component expect a name parameter and a label parameter
 * @returns a multi-select component
 */
const MultiSelectWrapper = ({ children, name, size, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (event) => {
        const { value } = event.target;
        setFieldValue(name, value);
    };

    const configMultiSelect = {
        ...field,
        ...props,
        onChange: handleChange,
    };

    return (
        <FormControl
            error={meta && meta.touched && meta.error ? true : false}
            size={size}
            sx={{
                width: '100%',
                fieldset: { borderRadius: '10px' },
                '.css-232ctg-MuiFormHelperText-root.Mui-error': {
                    color: '#FF4B55',
                },
                '& .Mui-error': {
                    color: '#FF4B55',
                },
                '.css-1iumxyh-MuiFormLabel-root-MuiInputLabel-root.Mui-error': {
                    color: '#FF4B55',
                },
                '.css-1mf0ctg-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF4B55',
                },
                '.css-1mf0ctg-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#5b80ba',
                },
                '.css-1iumxyh-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                    color: '#5b80ba',
                },
                '.css-1iumxyh-MuiFormLabel-root-MuiInputLabel-root.Mui-focused.Mui-error': {
                    color: '#FF4B55',
                },
                '.css-1mf0ctg-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline':
                    {
                        borderColor: '#FF4B55',
                    },
                '& .MuiFormHelperText-root.Mui-error': {
                    color: '#FF4B55',
                },
            }}
        >
            <InputLabel id="multi-label">{props.label}</InputLabel>
            <Select
                labelId="multi-label"
                id="demo-multiple-name"
                multiple
                input={<OutlinedInput label={props.label} />}
                {...configMultiSelect}
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
            </Select>
            {meta && meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
        </FormControl>
    );
};

export default MultiSelectWrapper;
