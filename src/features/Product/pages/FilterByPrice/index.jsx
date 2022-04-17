import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';

FilterByPrice.propTypes = {
    onChange: PropTypes.func.isRequired,
};
const useStyles = makeStyles(theme => ({
    root: {
        padding: ' 8px 16px',
        '& > button': {
            marginTop: '8px',
        }

    }
}))

function FilterByPrice({ onChange }) {
    const classes = useStyles()
    const timeoutRef = useRef(null)
    console.log(timeoutRef);
    const [price, setNewPrice] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewPrice((price) => ({
            ...price,
            [name]: value,
        }));
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            console.log('timeout nè');
        }, 3000)


    };
    const handlePriceChange = () => {
        if (!onChange) return;
        onChange(price);
        setNewPrice({
            salePrice_gte: 0,
            salePrice_lte: 0,
        })
    };
    return (
        <Box className={classes.root}>
            <Typography>Giá</Typography>
            <Box>
                <TextField label='Từ' fullWidth name='salePrice_gte' value={price.salePrice_gte} onChange={handleChange}></TextField>
                <TextField label='Đến' fullWidth name='salePrice_lte' value={price.salePrice_lte} onChange={handleChange}></TextField>
            </Box>
            <Button variant='contained' color='primary' onClick={handlePriceChange}>Áp dụng</Button>
        </Box>
    );
}

export default FilterByPrice;