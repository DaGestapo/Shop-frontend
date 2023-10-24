import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReduser } from "./redusers/userReduser";
import { newsAPI } from "./redusers/newsReduser";
import { advantageAPI } from "./redusers/advantageReduser";
import { featuredItemAPI } from "./redusers/featuredItemReduser";
import { itemReduser } from "./redusers/itemReduser";
import { cartReduser } from "./redusers/cartReduser";
import {wishReduser} from './redusers/wishReduser'

const rootRedusers = combineReducers({
    user: userReduser,
    item: itemReduser,
    cart: cartReduser,
    wish: wishReduser,
    [newsAPI.reducerPath]: newsAPI.reducer,
    [advantageAPI.reducerPath]: advantageAPI.reducer,
    [featuredItemAPI.reducerPath]: featuredItemAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootRedusers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                newsAPI.middleware,
                advantageAPI.middleware,
                featuredItemAPI.middleware
            ),
           
    })
}

export type RootState = ReturnType<typeof rootRedusers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];