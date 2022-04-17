import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from '@material-ui/core';

ProductSort.propTypes = {
    onChange: PropTypes.func,
    currentSort: PropTypes.string,
};

// ProductSort.defaultProps = {
//     onChange: null,

// }

function ProductSort({ onChange, currentSort }) {
    // const [value, setNewValue] = useState();
    const handleChange = (e, newValue) => {
        // setNewValue(newValue)
        console.log(newValue);
        if (!onChange) return
        onChange(newValue);
    };
    return (
        <Box>
            <Tabs
                value={currentSort}
                indicatorColor="primary"
                textColor="primary"
                variant='body2'
                onChange={handleChange}
            >
                <Tab label="Giá từ thấp đến cao" value='salePrice:ASC' />
                <Tab label="Giá từ cao đến thấp" value='salePrice:DESC' />
            </Tabs>
        </Box>

    );
}

export default ProductSort;