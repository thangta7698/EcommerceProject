import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { STATIC_HOST, THUMBNAIL_HOLDER } from '../../../constants/common';
import { cartItemCountSelector } from './AddToCartForm/selector';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addToCartActions } from './AddToCartForm/addToCartSlice';
import DeleteIcon from '@material-ui/icons/Delete';

OrderInfomation.propTypes = {

};

const useStyles = makeStyles(theme => ({
    root: {
        // border: `1px solid ${theme.palette.divider}`,


        '& > div': {
            borderTop: `1px solid ${theme.palette.divider}`,
            marginBottom: '8px',
            display: 'flex',
            padding: '8px 16px',
        },
        '& > div > div> img:hover': {
            cursor: 'pointer',
        }

    },
    productInformation: {
        flex: '1 ,1 ,1',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'row nowrap',
        width: '100%',
        position: 'relative',


    },
    bagCount: {
        fontSize: '20px',
        lineHight: '20px',
        padding: '8px 16px',
        backgroundColor: `${theme.palette.grey[300]}`,
        fontWeight: '600',
    },
    product: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`
    },
    productInfo: {
        width: '75%',
        marginLeft: '16px',
    },
    title: {
        fontWeight: '600',

    },
    common: {
        fontWeight: '500',

    },
    cartButton: {
        position: 'absolute',
        bottom: 0,

        '& > button': {
            textTransform: 'none',
            padding: 0,
            marginRight: '16px',
            width: '50px',
            fontWeight: '600',


        },
        '&:hover': {
            cursor: 'pointer',
        }



    },
    continueShopping: {
        border: '2px solid black',
        width: '260px',
        textAlign: 'center',
        cusor: 'pointer'

    }



}));
function OrderInfomation(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const CartItemCount = useSelector(cartItemCountSelector);
    const cartList = useSelector(state => state.cart.cartList);
    const handleRemove = (id) => {
        console.log(id);
        dispatch(addToCartActions.deleteCart(id));
    };
    console.log(cartList);

    return (
        <Box>
            <Typography className={classes.continueShopping} variant='h6'>CONTINUE SHOPPING</Typography>
            <Box mt={2} className={classes.root}>
                <Typography className={classes.bagCount} variant='h6'>YOUR BAG({CartItemCount}) </Typography>
                {cartList.map((cartItem, index) => (
                    <Box className={classes.product} key={index} padding={1} >
                        <Box onClick={() => { history.push(`/products/${cartItem.product.id}`) }} width='200px' >
                            <img
                                src={cartItem.product.thumbnail ? `${STATIC_HOST}${cartItem.product.thumbnail?.url}`
                                    : `${THUMBNAIL_HOLDER}`}
                                alt={cartItem.name}
                                width='100%'
                                objectFit='cover'
                            />
                        </Box>
                        <Box className={classes.productInformation}>
                            <Box className={classes.productInfo}>
                                <Typography className={classes.title}  >{cartItem.product.name}</Typography>
                                <Typography className={classes.common} >Quantity : {cartItem.quantity}</Typography>
                                <Box className={classes.cartButton}>
                                    <DeleteIcon onClick={() => { handleRemove(cartItem.product.id) }}></DeleteIcon>
                                </Box>
                            </Box>
                            <Typography className={classes.common} >Price: {cartItem.product.salePrice}.VNĐ</Typography>
                        </Box  >


                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default OrderInfomation;