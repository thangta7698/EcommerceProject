import { Badge, Box, Container, Fade, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ShoppingCart } from '@material-ui/icons';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { LOGIN, REGISTER } from '../../constants';
import Login from '../../features/Auth/components/Login';
import Register from '../../features/Auth/components/Register';
import { logout } from '../../features/Auth/userSlice';
import { cartItemCountSelector } from '../../features/Product/components/AddToCartForm/selector';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0,
        margin: 0,

    },
    menuButton: {
        marginRight: theme.spacing(2),
        fontSize: '16px',
        cursor: 'pointer'

    },
    title: {
        flexGrow: 1,
    },
    textField: {

        overflow: 'hidden'

    },
    navBar: {
        width: '100%',
        maxWidth: '1339px',
        margin: '0 auto'
    }
    // orange: {
    //     color: theme.palette.getContrastText(deepOrange[500]),
    //     backgroundColor: deepOrange[500],
    // },

}));

export default function Header() {
    const isLoginned = Boolean(useSelector(state => state.user.user.id));
    const history = useHistory();
    const dispatch = useDispatch();
    const CartItemCount = useSelector(cartItemCountSelector);

    console.log(CartItemCount);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showLogin, setShowLogin] = useState(LOGIN);
    const [showRegister, setShowRegister] = useState();
    const [cartItemQty, setCartItemQty] = useState(CartItemCount);

    const openMenu = Boolean(anchorEl);
    // Handle Dialog Form
    const handleClickOpen = () => {
        setOpen(true);
        setShowLogin(LOGIN);
        setShowRegister('')
    };

    const handleClose = () => {
        setOpen(false);
    };
    // Handle drop menu

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    // Handle Logout
    const handleLogout = () => {
        setAnchorEl(null);
        localStorage.removeItem('Cart_List');
        setCartItemQty(0);
        dispatch(logout());
        return history.push('/products');
    }
    // Home
    const handleClick = () => {
        history.push('/products')
    };
    // order form
    const clickToOrderForm = () => {
        history.push('/products/order')
    };
    const handleShowLoginForm = () => {
        setShowRegister('');
        setShowLogin(LOGIN);
    };
    const handleShowRegisterForm = () => {
        setShowLogin('');
        setShowRegister(REGISTER);
    }
    useEffect(() => {
        setCartItemQty(CartItemCount);
    }, [CartItemCount]);
    return (
        <Box className={classes.root}>
            <AppBar position="static" >
                <Container>
                    <Toolbar >
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Ecommerce Project
                        </Typography>
                        {/* Login */}
                        <Typography><IconButton color="inherit">
                            <Badge badgeContent={cartItemQty} color="secondary" onClick={clickToOrderForm}>
                                <ShoppingCart />
                            </Badge>
                        </IconButton></Typography>
                        <Typography className={classes.menuButton} to="/thong-bao" variant="h6" color="inherit">Notification</Typography >
                        <Typography onClick={handleClick} className={classes.menuButton} to="/products" variant="h6" color="inherit">Home</Typography >
                        {isLoginned && (
                            <IconButton onClick={handleClickMenu}>
                                <AccountCircleRoundedIcon alt="Remy Sharp" color='inherit' className={classes.orange}>
                                </AccountCircleRoundedIcon>
                            </IconButton>
                        )}
                        {!isLoginned && <Typography className={classes.menuButton} onClick={handleClickOpen} variant="h6" color="inherit">Login</Typography >}
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogContent className={classes.textField}  >

                                {showRegister &&
                                    <Box>
                                        <Register handleClickRegisterForm={handleClose} />
                                        <Typography onClick={handleShowLoginForm} style={{ fontSize: '16px', textAlign: 'center', margin: '0', cursor: 'pointer' }} variant="h6" >
                                            Did you have an account?<span style={{ fontSize: '16px', textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>Login now</span>
                                        </Typography>
                                    </Box>}
                                {showLogin &&
                                    <Box>
                                        <Login handleClickLoginForm={handleClose} />
                                        <Typography onClick={handleShowRegisterForm} style={{ fontSize: '16px', textAlign: 'center', margin: '0', }} variant="h6" >
                                            You don't have an account? <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}> Register now</span>
                                        </Typography>
                                    </Box>}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={openMenu}
                            onClose={handleCloseMenu}
                            TransitionComponent={Fade}
                            elevation={0}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                            <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </Container>

            </AppBar>
        </Box>
    );
}