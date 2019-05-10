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
		this.props.loginUser({ email: this.state.email, password: this.state.password }, this.state.isUser);
	};

	changeUser = () => this.setState({ isUser: true });
	changeCompany = () => this.setState({ isUser: false });

	render() {
		const { isUser } = this.state;
		return (
			<div className="container my-5">
				<div className="row justify-content-center">
					<div className="col-md-6 shadow p-5 rounded">
						<div className="d-flex text-center text-light mb-3" style={{ cursor: 'pointer' }}>
							<div
								onClick={this.changeUser}
								style={{ borderRadius: '1rem 0 0 1rem' }}
								className={`col-6 p-3 shadow ${isUser ? 'bg-primary' : 'bg-dark'}`}
							>
								User
							</div>
							<div
								onClick={this.changeCompany}
								style={{ borderRadius: '0 1rem 1rem 0' }}
								className={`col-6 p-3 shadow ${isUser ? 'bg-dark' : 'bg-primary'}`}
							>
								Company
							</div>
						</div>
						<h1>{isUser ? 'User Login' : 'Company Login'}</h1>
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
								<label htmlFor="password">Password</label>
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
