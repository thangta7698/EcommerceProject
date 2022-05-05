
import UserReducer from "../../features/Auth/userSlice";
import AddToCartReducer from '../../features/Product/components/AddToCartForm/addToCartSlice';
const { configureStore } = require("@reduxjs/toolkit");
const rootReducer = {
    user: UserReducer,
    cart: AddToCartReducer,
}
const store = configureStore({
    reducer: rootReducer
})
export default store;