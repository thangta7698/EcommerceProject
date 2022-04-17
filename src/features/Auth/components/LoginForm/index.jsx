import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-control/InputField';
import PasswordField from '../../../../components/form-control/PasswordField';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px 10px',
        width: '400px',

    },
    avatar: {
        margin: '0 auto',
        backgroundColor: 'red',
        marginBottom: theme.spacing(4)
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(2)
    },
    inputLogin: {
        margin: theme.spacing(10, 10),
        display: 'block'
    },
    buttonRegister: {
        width: '100%',
        marginTop: theme.spacing(4)

    },
}))
LoginForm.propTypes = {
    onSubmit: PropTypes.func,
    handleClickLoginForm: PropTypes.func,
};
LoginForm.defaultProps = {
    onSubmit: null,

}
const schema = yup.object().shape({
    identifier: yup.string().required('Please enter your email').email('Email is invalid'),
    password: yup.string().required('Please enter your password').min(6, 'Password at least 6 characters'),

});

function LoginForm(props) {
    const { enqueueSnackbar } = useSnackbar();
    const { onSubmit } = props;
    const classes = useStyles();
    const [error, setError] = useState();

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });
    const { formState: { isSubmitting } } = form

    const handleSubmit = async (values) => {
        try {
            setError('');
            if (!onSubmit) return;
            await onSubmit(values);
            enqueueSnackbar('Login Successfully', { variant: 'success' });


        }
        catch (error) {
            setError(error.message);
        }
    }


    return (
        <div>
            {isSubmitting && <LinearProgress />}
            <form className={classes.root} onSubmit={form.handleSubmit(handleSubmit)}>
                <Avatar className={classes.avatar}> <LockOutlinedIcon></LockOutlinedIcon></Avatar>
                <Typography className={classes.title} component='h3' variant='h5'>Login</Typography>
                <InputField className={classes.inputLogin} name='identifier' form={form} label='Email' />
                <PasswordField className={classes.inputLogin} name='password' form={form} label='Password' />
                <Box mt={2}>
                    <Button disabled={isSubmitting} type='submit' size='large' fullWidth variant='contained' color='primary' >Login</Button>
                </Box>
                <Box mt={2}>
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>

            </form>
        </div>

    );
}

export default LoginForm;