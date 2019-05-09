import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/auth';

class Login extends Component {
	state = {
		isUser: true,
		email: '',
		password: ''
	};

	onChange = (e) => {
		// console.log(e);
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		this.props.loginUser({ email: this.state.email, password: this.state.password });
	};

	render() {
		return (
			<div className="container my-5">
				<div className="row justify-content-center">
					<div className="col-md-6 shadow p-5 rounded">
						<h1>Login</h1>
						<hr />
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									onChange={this.onChange}
									value={this.state.email}
									type="email"
									placeholder="Email"
									id="email"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Email</label>
								<input
									onChange={this.onChange}
									value={this.state.password}
									type="password"
									placeholder="Password"
									id="password"
									className="form-control"
								/>
							</div>
							<button className="btn btn-success">Submit</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { loginUser })(Login);
