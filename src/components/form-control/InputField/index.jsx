import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string,
};

function InputField(props) {
    const { name, form, label } = props;
    const { formState: { errors } } = form
    const hasError = errors[name]
    console.log(errors[name]);

    return (
        <Controller
            control={form.control}
            name={name}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <TextField
                    label={label}
                    error={!!hasError}
                    onBlur={onBlur}
                    onChange={onChange}
                    inputRef={ref}
                    value={value}
                    name={name}
                    fullWidth
                    variant="outlined"
                    helperText={hasError?.message}
                />
            )}
        />
    );
}

export default InputField;