import { Box, Grid, Container, LinearProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { productApi } from '../../../../api/productApi';
import FilterByCategory from '../FilterByCategory';
import FilterByPrice from '../FilterByPrice';
import FilterCheck from '../FilterCheck';
import FilterView from '../FilterView';
import ProductList from '../ProducList';
import ProductSkeleton from '../ProductSkeleton';
import ProductSort from '../ProductSort';


ListPage.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    left: {
        width: '25%'
    },
    right: {
        width: '75%',
        flex: ' 1 1 1'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2)
    },
    productList: {
        width: '100%',
        maxWidth: '1339px',
        margin: '20px auto 0 auto'
    }
}))

function ListPage(props) {
    console.log('render');
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [loading, setLoading] = useState();
    const [pagination, setPagination] = useState({
    });
    const [productList, setProductList] = useState([]);
    // QueryParam
    const QueryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            ...params,
            _page: parseInt(params._page) || 1,
            _limit: parseInt(params._limit) || 12,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',

        }
    }, [location.search])
    // Pagination
    // Call Data
    console.log(loading);
    useEffect(() => {
        (async () => {

            setLoading(true);

        })();
    }, [QueryParams]);
    useEffect(() => {
        (async () => {
            try {

                const { data, pagination } = await productApi.getAll(QueryParams)
                setProductList(data);
                setPagination(pagination);
            }
            catch (error) {
                console.log('error: ', error);
            }
            setLoading(false);

        })();
    }, [QueryParams])
    // Handle Click
    const handleClickPage = (e, page) => {
        const filter = {
            ...QueryParams,
            _page: page
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filter)
        })
    }
    const handleSortChange = (newValue) => {
        const filter = {
            ...QueryParams,
            _sort: newValue,
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filter)
        })
        console.log(filter);
    };
    const handleCategoryChange = (categoryItem) => {
        const filter = {
            ...QueryParams,
            'category.id': categoryItem.id,
        };
        // setFilters({
        //     ...QueryParams,
        //     'category.id': categoryItem.id,
        // })
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filter)
        })

    };
    const handleFilterChange = (values) => {
        const filter = {
            ...QueryParams,
            ...values,

        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filter)
        })

    };
    const handleChangeFilterView = (newFilters) => {
        // const QueryParam = queryString.parse(location.search)
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters)
        })

    }


    return (

        <Container>
            <Box className={classes.productList}>
                {loading ? <Typography><LinearProgress /></Typography> : null}
                <Grid container spacing={2} >
                    <Grid item className={classes.left}>
                        <Paper evaluation={0}>
                            <FilterByCategory onChange={handleCategoryChange} />
                            <FilterByPrice onChange={handleFilterChange} />
                            <FilterCheck filter={QueryParams} onChange={handleFilterChange} />

                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper>
                            <FilterView filter={QueryParams} onChange={handleChangeFilterView} />
                            <ProductSort currentSort={QueryParams._sort} onChange={handleSortChange} />
                            <Box>{loading ? <ProductSkeleton length={12} /> : <ProductList data={productList} />}</Box>
                            <Box className={classes.pagination}>
                                <Pagination
                                    count={Math.ceil(pagination.count / pagination.limit)}
                                    defaultPage={pagination.page}
                                    color='primary'
                                    onChange={handleClickPage}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default ListPage;