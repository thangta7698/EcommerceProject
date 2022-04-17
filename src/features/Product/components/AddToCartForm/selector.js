import { createSelector } from '@reduxjs/toolkit';
const cartItemSelector = state => state.cart.cartList;

export const cartItemCountSelector = createSelector(
    cartItemSelector,
    (cartList) => cartList.reduce((count) => ++count, 0)
);

export const cartItemPriceSelector = createSelector(
    cartItemSelector,
    (cartList) => cartList.reduce((totalPrice, item) => totalPrice + item.quantity * item.product.salePrice, 0)
);