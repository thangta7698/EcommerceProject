import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box, Grid } from '@material-ui/core';

ProductSkeleton.propTypes = {
    length: PropTypes.number
};


function ProductSkeleton({ length = undefined }) {

    return (
        <Box>
            <Grid container>
                {Array.from(new Array(length)).map((x, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3} >
                        <Box padding={1} >
                            <Skeleton variant="rect" width='100%' height={218} />
                            <Skeleton variant='text' animation="wave" />
                            <Skeleton variant='text' animation="wave" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductSkeleton;