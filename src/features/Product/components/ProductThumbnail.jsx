import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_HOLDER } from '../../../constants/common';

ProductThumbnail.propTypes = {
    product: PropTypes.object
};

function ProductThumbnail({ product = {} }) {
    const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}`
        : `${THUMBNAIL_HOLDER}`;
    return (
        <Box height='300px' padding={1} >
            <img
                src={thumbnailUrl}
                alt={product.name}
                width='100%'
                heigth='100%'
            />
        </Box>
    )
}

export default ProductThumbnail;