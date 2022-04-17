import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import LoginForm from '../LoginForm';
Login.propTypes = {
    handleClickLoginForm: PropTypes.func,
}
Login.defaultProps = {
    handleClickLoginForm: null,
}

function Login(props) {
    const { handleClickLoginForm } = props
    const dispatch = useDispatch()
    const handleSubmit = async (values) => {
        try {
            const resultAction = await dispatch(login(values));
            const result = unwrapResult(resultAction);
            if (!!handleClickLoginForm) {
                // close login form after login
                handleClickLoginForm();
            }

        }
        catch (error) {
            throw new Error('Login failed')
        }


    }
    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}
export default Login;