import React from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { cartItemPriceSelector } from './AddToCartForm/selector';

OrderSummary.propTypes = {

};
const useStyles = makeStyles(theme => ({
    root: {
        border: `1px solid ${theme.palette.grey[300]} `,


    },
    checkout: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'black',
        width: '200px',
        border: '2px solid black',
        cusor: 'pointer'
    },
    summaryTitle: {
        fontSize: '20px',
        lineHight: '20px',
        padding: '8px 16px',
        fontWeight: '600',
        textAlign: 'center',

    },
    summaryList: {
        '& > li': {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: "10px"
        }
    }



}))

function OrderSummary(props) {
    const orderTotalPrice = useSelector(cartItemPriceSelector);

    const classes = useStyles();
    return (
        <div>

            <Box style={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Typography className={classes.checkout} variant='h6'> CHECKOUT NOW</Typography>
            </Box>
            <Box mt={2} className={classes.root}  >
                <Typography className={classes.summaryTitle} variant='h6'>ORDER SUMMARY</Typography>

                <List className={classes.summaryList}>
                    <ListItem>
                        <Typography>Subtotal</Typography>
                        <Typography>{orderTotalPrice}$</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Shipping fee</Typography>
                        <Typography>0$</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Discount</Typography>
                        <Typography>0$</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography style={{ fontWeight: '600' }}>Total</Typography>
                        <Typography>{`${orderTotalPrice}$`}</Typography>
                    </ListItem>


                </List>
            </Box>
        </div>
    );
}

export default OrderSummary;