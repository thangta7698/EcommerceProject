import { Box, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';
import Product from '../product';
ProductList.propTypes = {
    data: PropTypes.array
};
ProductList.defaultProps = {
    data: [],
}

function ProductList(props) {
    const { data } = props;
    // const match = useRouteMatch();
    return (
        <Box >
            <Grid container>
                {data.map(product => (
                    <Grid key={product.id} padding={2} item key={product.id} xs={12} sm={6} md={4} lg={3} >
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;