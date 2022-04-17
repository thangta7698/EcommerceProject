import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { RemoveCircleOutline } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string,
};
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        fontSize: '16px',
        marginTop: theme.spacing(2),

    }
}))
function QuantityField(props) {
    const classes = useStyles();
    const { name, form, label } = props;
    const { formState: { errors }, setValue } = form
    const hasError = errors[name]
    console.log(errors[name]);

    return (
        <Box>
            <Typography component='h1' className={classes.label}>{label}</Typography>

            <Controller
                control={form.control}
                name={name}
                render={({ field: { onChange, onBlur, value, name, } }) => (
                    <Box className={classes.root}>
                        <Button onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 0)}>
                            <RemoveCircleOutline />
                        </Button>
                        <TextField
                            error={!!hasError}
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            name={name}
                            variant="outlined"
                            helperText={hasError?.message}
                        />
                        <Button onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
                            <AddCircleIcon />
                        </Button>
                    </Box>
                )}
            />
        </Box>
    );
}

export default QuantityField;