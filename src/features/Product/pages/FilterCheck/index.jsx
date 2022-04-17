import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControlLabel } from '@material-ui/core';

FilterCheck.propTypes = {
    filter: PropTypes.object,
    onChange: PropTypes.func
};

function FilterCheck({ filter = {}, onChange = null }) {
    const handleCheckbox = (e) => {
        if (!onChange) return;
        const { name, checked } = e.target;
        console.log(name, checked)
        onChange({
            [name]: checked
        })

    };
    return (
        <Box>
            {[{ value: 'isPromotion', label: 'Có khuyến mãi' },
            { value: 'isFreeShip', label: 'Giao hàng miễn phí' }].map(service => (
                <FormControlLabel key={service.label}
                    control={<Checkbox
                        checked={filter[service.value]}
                        onChange={handleCheckbox}
                        name={service.value}
                        color='default'
                    />}
                    label={service.label}
                />
            ))}
        </Box>
    );
}

export default FilterCheck;