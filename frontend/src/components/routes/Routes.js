import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from '../../containers/Cart/Cart';
import PrivateRoute from './PrivateRoute';
import Login from '../../containers/Login/Login';
import SignUp from '../../containers/SignUp/SignUp';
import Product from './../../containers/Products/Product';
import CreateProduct from './../../containers/CreateProduct/CreateProduct';
import CompanyProducts from './../../containers/Company/CompanyProducts';
import Orders from '../User/Orders';

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
