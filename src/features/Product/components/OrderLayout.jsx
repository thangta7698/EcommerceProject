import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import OrderInfomation from './OrderInfomation';
import OrderSummary from './OrderSummary';

OrderLayout.propTypes = {


};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
    },
    left: {
        width: '75%',
        flexBasis: '1',

    },
    right: {
        width: '25%',
    }
}));
function OrderLayout(props) {
    const classes = useStyles();
    return (
        <Box>
            <Container>
                <Grid className={classes.root} container>
                    <Grid className={classes.left} item>
                        <OrderInfomation />
                    </Grid>
                    <Grid className={classes.right} item>
                        <OrderSummary />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default OrderLayout;