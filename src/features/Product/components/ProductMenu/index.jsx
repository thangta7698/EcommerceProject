import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

ProductMenu.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        flexFlow: ' row nowrap',
        '& > li': {
            padding: theme.spacing(4, 4, 0, 4),

        },
        '& > li > a': {
            color: theme.palette.grey[700],
            textDecoration: 'none',

        },
        '& > li > a.active': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },


    },


}))

function ProductMenu(props) {
    const classes = useStyles();
    const { url } = useRouteMatch();
    return (
        <Box component='ul' className={classes.root} >
            <li>
                <Link component={NavLink} to={url} exact>
                    Description
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`} exact>
                    Additional Information
                </Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/reviews`} exact>
                    Reviews
                </Link>
            </li>



        </Box>
    );
}

export default ProductMenu;