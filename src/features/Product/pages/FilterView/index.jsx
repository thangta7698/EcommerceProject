import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@material-ui/core';

FilterView.propTypes = {
    filter: PropTypes.object,
    onChange: PropTypes.func
};

function FilterView({ filter = {}, onChange = null }) {
    const FILTER_LIST = [
        {
            id: 1,
            getLabel: (filter) => 'Giao hàng miễn phí',
            isVisible: (filter) => true,
            isActive: (filter) => filter.isFreeShip,
            isRemoveable: false,
            onToggle: (filter) => {
                const newFilter = { ...filter }
                if (newFilter.isFreeShip) {
                    delete newFilter.isFreeShip;
                }
                else {
                    newFilter.isFreeShip = true;
                }
                return newFilter;
            },
            onRemove: null,
        },
        {
            id: 2,
            getLabel: (filter) => 'Có khuyến mãi',
            isVisible: (filter) => filter.isPromotion,
            isActive: (filter) => filter.isPromotion,
            isRemoveable: true,
            onToggle: null,
            onRemove: (filter) => {
                const newFilter = { ...filter }
                delete newFilter.isPromotion;
                return newFilter;
            },
        },
        {
            id: 3,
            getLabel: (filter) => `Từ ${filter.salePrice_gte} đến ${filter.salePrice_lte}`,
            isVisible: (filter) => filter.salePrice_gte || filter.salePrice_lte,
            isActive: (filter) => filter.salePrice_gte || filter.salePrice_lte,
            isRemoveable: true,
            onToggle: null,
            onRemove: (filter) => {
                const newFilter = { ...filter }
                delete newFilter.salePrice_gte;
                delete newFilter.salePrice_lte;
                return newFilter;
            },
        },

    ];
    const FilterViewList = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filter));
    }, [filter]);

    return (
        <Box>
            {FilterViewList.map(filterViewItem => (
                <Chip key={filterViewItem.id}
                    label={filterViewItem.getLabel(filter)}
                    clickable={!filterViewItem.isRemoveable}
                    color={filterViewItem.isActive(filter) ? 'primary' : 'default'}
                    onClick={filterViewItem.isRemoveable ? null : () => {
                        const newFilter = filterViewItem.onToggle(filter)
                        if (!onChange) return;
                        onChange(newFilter);
                    }}
                    onDelete={filterViewItem.isRemoveable ? () => {
                        const newFilter = filterViewItem.onRemove(filter)
                        if (!onChange) return;
                        onChange(newFilter);
                    } : null}
                />


            ))}
        </Box>
    );
}

export default FilterView;