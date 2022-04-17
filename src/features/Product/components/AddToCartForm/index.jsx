import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from '../../../../components/form-control/QuantityField';
AddToCartForm.propTypes = {
    onSubmit: PropTypes.func
};
const schema = yup.object().shape({
    quantity: yup.number().required('Required field')

});
const useStyles = makeStyles((theme) => ({
    buttonForm: {
        width: '50%',
        marginTop: theme.spacing(4)
    }
}))
function AddToCartForm({ onSubmit = null }) {
    const classes = useStyles();
    const handleSubmit = ({ quantity }) => {
        console.log(quantity);
        onSubmit(quantity)
    }
    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    })
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name='quantity' label='Số lượng' form={form} />
            <Button className={classes.buttonForm} type='submit' variant='contained' color='primary' >Add to cart</Button>

        </form>
    );
}

export default AddToCartForm;