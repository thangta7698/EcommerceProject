import { createSlice } from '@reduxjs/toolkit';
const addToCartSlice = createSlice({
    name: 'addToCart',
    initialState: {
        miniCart: false,
        cartList: JSON.parse(localStorage.getItem('Cart_List')) || [],

    },
    reducers: {
        showMiniCart(state) {

            return state.miniCart = true
        },
        hideMiniCart(state) {
            return state.miniCart = false
        },
        addToCart(state, action) {
            const newItem = action.payload;
            console.log(action);
            const itemIndex = state.cartList.findIndex(cartItem => cartItem.id === newItem.id);
            console.log(itemIndex);
            if (itemIndex > -1) {
                state.cartList[itemIndex].quantity += newItem.quantity;
            }
            else {
                state.cartList.push(newItem)
            }
            localStorage.setItem('Cart_List', JSON.stringify(state.cartList));

        },
        deleteCart(state, action) {
            const id = action.payload;
            const itemIndex = state.cartList.findIndex(cartItem => cartItem.id === id);
            console.log(itemIndex);
            if (itemIndex > -1) {
                const newCartList = state.cartList.filter(cartItem => cartItem.id !== id);
                state.cartList = newCartList;
            }
            else {

            }

        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            const itemIndex = state.cartList.findIndex(cartItem => cartItem.id === id);
            state.cartList[itemIndex].quantity = quantity;
        }
    }
})
const { actions, reducer } = addToCartSlice;
export const addToCartActions = actions;
export default reducer;