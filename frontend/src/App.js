import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './containers/SignUp/SignUpUser';
import Products from './containers/Products/Products';
import Login from './containers/Login/Login';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Navbar />
						<Switch>
							<Route path="/login" component={Login} />
							<Route path="/signup" component={SignUp} />
							{/* <Route path="/new-product" component={CreateProduct} /> */}
							{/* <Route path="/product/:id" component={Product} /> */}
							{/* <Route path="/cart" component={ShopingCart} /> */}
							<Route path="/" component={Products} />
						</Switch>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
