
import CounterReducer from "../../features/Counter/counterSlice";
import UserReducer from "../../features/Auth/userSlice";
import AddToCartReducer from '../../features/Product/components/AddToCartForm/addToCartSlice';
const { configureStore } = require("@reduxjs/toolkit");
const rootReducer = {
    counter: CounterReducer,
    user: UserReducer,
    cart: AddToCartReducer,
}
const store = configureStore({
    reducer: rootReducer
})
export default store;