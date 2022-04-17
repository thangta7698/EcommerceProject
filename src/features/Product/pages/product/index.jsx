import { Box, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import { ScatterPlotTwoTone } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import { STATIC_HOST, THUMBNAIL_HOLDER } from '../../../../constants/common';
Product.propTypes = {
    product: PropTypes.object.isRequired,
};
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '100%',
        height: '350px',
        margin: theme.spacing(2, 2, 0, 1),
        boxSizing: 'border-box',
        '&:hover ': {
            cursor: 'pointer',
            transform: 'scale(1.01)',
            border: `1px solid ${theme.palette.divider}`,
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {

    },
    cardAction: {
        height: '50px',
    }
}))
function Product({ product = { } }) {
    const classes = useStyles();
    const history = useHistory();
    const handleClick = () => {
        history.push(`products/${product.id}`)
    }
    const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}`
        : `${THUMBNAIL_HOLDER}`
    return (
        // <Box padding={1} spacing={1} onClick={handleClick}>
        //     <img
        //         src={thumbnailUrl}
        //         alt={product.name}
        //         width='100%'
        //     />
        //     <Typography variant='body2'>{product.name}</Typography>
        //     <Typography variant='body2'>
        //         <Box component='span' fontSize='16px' fontWeight='bold' >{product.salePrice}đ</Box >
        //         {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
        //     </Typography>
        // </Box>
        <Card className={classes.root} onClick={handleClick}>
            <Box >
                <img
                    src={thumbnailUrl}
                    alt={product.name}
                    width='100%'
                />
                <Typography variant='body2'>{product.name}</Typography>
                <Typography variant='body2'>
                    <Box component='span' fontSize='16px' fontWeight='bold' >{product.salePrice}đ</Box >
                    {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
                </Typography>
            </Box>
            <CardActions className={classes.cardAction}>
                <Button size="small" color="primary">
                    Buy
                </Button>
                <Button size="small" color="primary">
                    Detail
                </Button>
            </CardActions>
        </Card>

    );
}

export default Product;