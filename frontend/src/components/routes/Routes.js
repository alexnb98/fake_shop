import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from '../../containers/Cart/Cart';
import PrivateRoute from './PrivateRoute';
import Login from '../../containers/Login/Login';
import SignUp from '../../containers/SignUp/SignUp';
import Product from './../../containers/Products/Product';

export default function Routes() {
	return (
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/signup" component={SignUp} />
			<Route path="/product/:id" component={Product} />
			<PrivateRoute exact path="/user/cart" component={Cart} />
		</Switch>
	);
}
