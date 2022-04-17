import { Box, Container, Grid, LinearProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProductDescription from '../../components/ProductDescription';
import Information from '../../components/ProductDetailInformation';
import ProductInfo from '../../components/ProductInfo';
import ProductMenu from '../../components/ProductMenu';
import ProductThumbnail from '../../components/ProductThumbnail';
import { useGetProductDetail } from './hooks/useGetProductDetail';


DetailPage.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    root: {
    },
    left: {
        width: '25%',
        padding: theme.spacing(1.5),
        borderRight: `2px solid ${theme.palette.grey[300]}`,


    },
    right: {
        width: '75%',
        flex: ' 1 1 1',
        padding: theme.spacing(1.5),


    },
    loading: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}))
function DetailPage(props) {
    const classes = useStyles()
    const { params: { productId }, url } = useRouteMatch();
    const { product, loading } = useGetProductDetail(productId);
    console.log({ params: { productId }, url });


    return (
        <Box >
            <Typography className={classes.loading}>{loading ? <LinearProgress /> : null}</Typography>

            <Container>
                <Paper evaluation={0}>
                    <Grid container   >
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                        </Grid>
                    </Grid>
                </Paper>
                <ProductMenu />
                <Switch>
                    <Route exact path={url}>
                        <ProductDescription product={product} />
                    </Route>
                    <Route exact path={`${url}/additional`}>
                        <Information />
                    </Route>

                </Switch>
            </Container>
        </Box >
    );
}

export default DetailPage;