import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-control/InputField';
import PasswordField from '../../../../components/form-control/PasswordField';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px 10px',
        width: '400px'
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
    inputRegister: {
        margin: theme.spacing(10, 10),
        display: 'block'
    },
    buttonRegister: {

        width: '100%',
        marginTop: theme.spacing(4)

    },
}))
RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};
RegisterForm.defaultProps = {
    onSubmit: null,
}
// validate form
const schema = yup.object().shape({
    fullName: yup
        .string().required('Plese input this name ')
        .test('Please input', 'Name is invalid', (values) => {
            return values.split(' ').length >= 2;
        }),
    password: yup.string().required('Please input this the password').min(6, 'At least 6 characters'),
    retypePassword: yup.string().required('Please input the password').min(6, 'At least 6 characters'),
    email: yup.string().required('Please Input').email('Invalid input the email')
});

function RegisterForm(props) {
    const { onSubmit } = props;
    const [error, setError] = useState();
    const classes = useStyles();
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        try {
            setError('');
            if (!onSubmit) return;
            await onSubmit(values);
        }
        catch (error) {
            console.log(error)
        }
    }
    const { formState: { isSubmitting } } = form

    return (
        <div>

            <form className={classes.root} onSubmit={form.handleSubmit(handleSubmit)}>
                {isSubmitting && <LinearProgress />}
                <Avatar className={classes.avatar}> <LockOutlinedIcon></LockOutlinedIcon></Avatar>
                <Typography className={classes.title} component='h3' variant='h5'>Creat an account</Typography>
                <InputField className={classes.inputRegister} name='fullName' form={form} label='Full Name' />
                <Box mt={2}>
                    <InputField className={classes.inputRegister} name='email' form={form} label='Email' />
                </Box>
                <PasswordField className={classes.inputRegister} name='password' form={form} label='Password' />
                <PasswordField className={classes.inputRegister} name='retypePassword' form={form} label='Retype Password' />
                <Button disabled={isSubmitting} className={classes.buttonRegister} type='submit' size="large" variant="contained" color='primary'> Create an account</Button>
            </form>
        </div>

    );
}

export default RegisterForm;