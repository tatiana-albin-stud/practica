import { MenuItem, Select, TextField, Typography } from '@mui/material';

/**
 * Drop down component, for now only used in the table header component
 * @param {*} dropDownItems - list used to display the value for filter component
 * @param {*} dropDownValue - filter value for drop down component
 * @param {*} setDropDownValue - used to set the state of the drop down component
 * @returns a drop down component
 */
export const FilterDropDown = ({ dropDownItems, dropDownValue, setDropDownValue }) => {
    return (
        <Select
            value={dropDownValue}
            onChange={(e) => setDropDownValue(e.target.value)}
            sx={{
                fieldset: {
                    borderRadius: '8px',
                    borderColor: '#009C10',
                },
                color: '#009C10',
                minWidth: '150px',
                '& .MuiSvgIcon-root': {
                    fill: '#009C10',
                },
                '& .MuiSelect-select': {
                    padding: '7px 14px',
                },

                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#009C10',
                },
            }}
        >
            {dropDownItems?.map((item) => {
                return (
                    <MenuItem value={item.id} key={item.id} onClick={item.onClick}>
                        {item.label}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export const OrderTypeDropDown = ({ dropDownItems, dropDownValue, setDropDownValue }) => {
    return (
        <TextField
            select="true"
            variant="outlined"
            value={dropDownValue}
            onChange={(e) => setDropDownValue(e.target.value)}
            sx={{
                fieldset: {
                    borderRadius: '10px',
                },
                minWidth: '120px',
                textAlign: 'center',

                '& .MuiSelect-select': {
                    padding: '7px 14px',
                },

                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: '#5b80ba',
                    },
                },
                '& label.Mui-focused': {
                    color: '#5b80ba',
                },
            }}
        >
            {dropDownItems.map((item) => {
                return (
                    <MenuItem
                        value={item.id}
                        key={item.id}
                        onClick={item.onClick}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: '#5b80ba61',
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: '#5b80ba85',
                            },
                        }}
                    >
                        {item.label}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export const LanguageDropDown = ({ dropDownItems, dropDownValue, setDropDownValue }) => {
    return (
        <TextField
            select="true"
            variant="outlined"
            value={dropDownValue}
            onChange={(e) => setDropDownValue(e.target.value)}
            sx={{
                fieldset: {
                    borderRadius: '10px',
                },
                minWidth: '120px',
                textAlign: 'center',

                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: '#5b80ba',
                    },
                },
                '& label.Mui-focused': {
                    color: '#5b80ba',
                },
            }}
        >
            {dropDownItems.map((item) => {
                return (
                    <MenuItem
                        value={item.id}
                        key={item.id}
                        onClick={item.onClick}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: '#5b80ba61',
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: '#5b80ba85',
                            },
                        }}
                    >
                        {item.label}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};
