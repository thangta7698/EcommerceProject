import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import { register } from '../../userSlice';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

Register.propTypes = {
    handleClickRegisterForm: PropTypes.func,
}
function Register({ handleClickRegisterForm = null }) {
    const dispatch = useDispatch()
    const history = useHistory();
    const handleSubmit = async (values) => {
        try {
            values.username = values.email;
            console.log(values);
            const resultAction = await dispatch(register(values));
            const result = unwrapResult(resultAction);
            if (!!handleClickRegisterForm) {
                // Close register form after register
                handleClickRegisterForm();

            }
            // history.push('/products')
        }
        catch (error) {
            console.log(error.response);
        }

    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;