import '@fontsource/roboto';
import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import AddToCartForm from './AddToCartForm';
import { addToCart, addToCartActions } from './AddToCartForm/addToCartSlice';


ProductInfo.propTypes = {
    product: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
    root: {
        height: '300px'
    },
    name: {
        fontSize: '30px',
        fontWeight: '500',
        marginBottom: theme.spacing(2)
    },
    priceBox: {
        backgroundColor: '#eeeeee',
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    salePrice: {
        fontWeight: '500',
        fontSize: '22px',
    },
    originalPrice: {
        textDecoration: 'line-through',
        margin: theme.spacing(0, 2, 0, 2),
        fontSize: '12px'
    },
    promotionPercent: {
        fontSize: '12px'
    }

}));
const schema = yup.object().shape({
    quantity: yup.number().required('Required field')

});
function ProductInfo({ product = {} }) {
    const classes = useStyles()
    const { salePrice, shortDescription, name, originalPrice, promotionPercent } = product;
    const dispatch = useDispatch();
    const handleAddToCart = (quantity) => {
        dispatch(addToCartActions.addToCart({
            quantity,
            product,
            id: product.id
        }))

    }
    return (
        <Box className={classes.root}>
            <Typography className={classes.name} variant='h4' component='h1'>{name}</Typography>
            <Typography variant='body2' component='h5' >{shortDescription}</Typography>
            <Box className={classes.priceBox}>
                <Box className={classes.salePrice} component='span' variant='h6'  >{salePrice}đ</Box>
                <Box className={classes.originalPrice} component='span' variant='h6' >{originalPrice}đ</Box>
                <Box className={classes.promotionPercent} component='span' variant='h6' >{promotionPercent}%</Box>
            </Box>
            <AddToCartForm onSubmit={handleAddToCart} />
        </Box>
    );
}

export default ProductInfo;