import { RoutesI } from "../model/routeI";
import { ADMIN_ROUTE, CONTACT_ROUTE, HOME_ROUTE, 
    ITEM_ROUTE, LOGIN_ROUTE, 
    PROFILE_ROUTE, REGISTRATION_ROUTE, 
    SHOP_ROUTE, 
    WISH_LIST_ROUTE,
    SHOP_BAGS_ROUTE,
    SHOP_BELT_ROUTE,
    SHOP_SNEAKERS_ROUTE,
    CART_ROUTE
} from "../utils/routeConst-utf";

import Auth from "../pages/Auth";
import Shop from '../pages/Shop';
import Item from '../pages/ItemPage';
import Admin from '../pages/Admin';
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import WishList from "../pages/WishList";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";

 export const authRoutes: RoutesI[] = [
    {path: PROFILE_ROUTE, component: Profile},
    {path: WISH_LIST_ROUTE, component: WishList},
    {path: CART_ROUTE, component: Cart},
//     {path: PAYMENT_ROUTE, component: Payment},
 ]

export const publicRoutes: RoutesI[] = [
    {path: HOME_ROUTE, component: Home},
    {path: SHOP_ROUTE, component: Shop},
    {path: SHOP_BAGS_ROUTE, component: Shop},
    {path: SHOP_BELT_ROUTE, component: Shop},
    {path: SHOP_SNEAKERS_ROUTE, component: Shop},
    {path: ITEM_ROUTE, component: Item},
    {path: CONTACT_ROUTE, component: Contact},
]

export const adminRoutes: RoutesI[] = [
    {path: ADMIN_ROUTE, component: Admin},
]

export const nonAuthRoutes: RoutesI[] = [
    {path: LOGIN_ROUTE, component: Auth},
    {path: REGISTRATION_ROUTE, component: Auth},
]