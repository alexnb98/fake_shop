import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import { setUserType } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';
import Routes from './components/routes/Routes';
import Landing from './containers/Landing';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

class App extends Component {
	componentDidMount() {
		store.dispatch(setUserType());
		setAuthToken(localStorage.token);
	}
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App position-relative" style={{ minHeight: '100vh' }}>
						<Alert />
						<Navbar />
						<Switch>
							<Route path="/" exact component={Landing} />
							<Route component={Routes} />
						</Switch>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
