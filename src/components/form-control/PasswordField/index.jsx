import { Box, FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useController } from 'react-hook-form';

PasswordField.propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string,

};



function PasswordField(props) {
    const { name, form: { control }, label } = props;

    // const hasError = errors[name];
    // console.log(hasError);
    const [showPassword, setShowPassword] = useState(false);
    function toggleShowPassword(x) {
        setShowPassword(x => !x)
    };
    const {
        field: { ref, value, onBlur, onChange },
        fieldState: { invalid, error },
        formState: { }
    } = useController({
        name,
        control,

    });

    return (
        <Box mt={2}>
            <FormControl fullWidth variant="outlined" >
                <InputLabel htmlFor={label}>{label}</InputLabel>
                <OutlinedInput
                    id={label}
                    label={label}
                    error={invalid}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    name={name}
                    inputRef={ref}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <FormHelperText error={invalid}>{error?.message}</FormHelperText>
            </FormControl>
        </Box >
    );
}

export default PasswordField;