import { Box, makeStyles, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { categoryApi } from '../../../../api/categoryApi';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { NavLink } from 'react-router-dom';


FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        padding: 0,
        margin: 0,
        backgroundColor: theme.palette.background.paper,
        '& > nav': {
            padding: 0,
            width: '100%',

        },
        '& > nav > div': {
            height: '30px',
            position: 'relative',
        },


    },
    categoryItem: {
        '& > .categoryIcon': {
            transform: 'rotateX(180deg)',
        }
    },
    categoryIcon: {
        // '&:hover': {
        //     transform: 'rotateX(180deg)',

        // },
        position: 'absolute',
        right: '10px',
    },

}));
function FilterByCategory({ onChange }) {
    const classes = useStyles();
    const [categoryList, setCategoryList] = useState([]);
    const handleChange = (categoryItem) => {
        if (!onChange) return;
        onChange(categoryItem);
    };
    useEffect(() => {
        (async () => {
            try {
                const categoryData = await categoryApi.getAll();
                console.log(categoryData)
                setCategoryList(categoryData.map((categoryItem) => ({
                    id: categoryItem.id,
                    name: categoryItem.name
                })
                ));
            }
            catch (error) {
                console.log('error: ', error)
            }


        })()
    }, [])


    return (
        <Box>
            <Typography variant='h6' style={{ textAlign: 'center' }}>Danh Mục Sản Phẩm</Typography>
            <ul className={classes.root} >
                {categoryList.map(categoryItem => (
                    <List key={categoryItem.id} onClick={() => { handleChange(categoryItem) }}
                        component="nav" aria-label="main mailbox folders">
                        <ListItem button className={classes.categoryItem}>
                            <ListItemText primary={categoryItem.name} />
                            <Box className={classes.categoryIcon}>
                                <ExpandMoreIcon />
                            </Box>
                        </ListItem>
                    </List>
                )
                )};

            </ul>

        </Box>
    );
}

export default FilterByCategory;
