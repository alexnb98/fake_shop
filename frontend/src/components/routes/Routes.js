import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from '../User/Cart/Cart';
import PrivateRoute from './PrivateRoute';
import Login from '../App/Login/Login';
import SignUp from '../App/SignUp/SignUp';
import Product from '../App/Products/Product/Product';
import CreateProduct from '../Company/CreateProduct/CreateProduct';
import CompanyProducts from '../Company/CompanyProducts';
import Orders from '../User/Orders/Orders';

export default function Routes() {
	return (
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/signup" component={SignUp} />
			<Route path="/product/:id" component={Product} />
			<PrivateRoute exact path="/user/cart" userType="user" component={Cart} />
			<PrivateRoute exact path="/user/orders" userType="user" component={Orders} />
			<PrivateRoute exact path="/company/create-product/:id" userType="company" component={CreateProduct} />
			<PrivateRoute exact path="/company/create-product" userType="company" component={CreateProduct} />
			<PrivateRoute exact path="/company/products" userType="company" component={CompanyProducts} />
		</Switch>
	);
}
