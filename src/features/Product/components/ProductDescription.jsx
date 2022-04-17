import { Box, Paper } from '@material-ui/core';
import React from 'react';

ProductDescription.propTypes = {

};

function ProductDescription({ product = {} }) {
    console.log(product);
    return (
        <Box pt={4}>
            <Paper evluation={1} style={{ padding: '15px' }}>
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </Paper>
        </Box>
    );


}

export default ProductDescription;