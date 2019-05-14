import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/App/Navbar';
import Alert from './components/App/Alert';
import { setUserType } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';
import Routes from './components/routes/Routes';
import Landing from './components/App/Landing';

if (sessionStorage.token) {
	setAuthToken(sessionStorage.token);
}

class App extends Component {
	componentDidMount() {
		store.dispatch(setUserType());
		setAuthToken(sessionStorage.token);
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
