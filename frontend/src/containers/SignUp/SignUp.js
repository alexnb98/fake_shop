import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../store/actions/auth';

class SignUp extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		isUser: false
	};

	onInputChangeHandler = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	submitHandler = (e) => {
		e.preventDefault();
		this.props.register(this.state);
	};

	changeUser = () => this.setState({ isUser: true });
	changeCompany = () => this.setState({ isUser: false });

	render() {
		const { isUser } = this.state;
		return (
			<div className="container my-5">
				<div className="row justify-content-center">
					<div className="col-md-6 shadow p-5 rounded">
						<h1>Sign Up</h1>
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
						<hr />
						<form>
							<div className="form-group">
								<label htmlFor="name">name</label>
								<input
									onChange={this.onInputChangeHandler}
									value={this.state.name}
									type="text"
									placeholder="name"
									id="name"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									onChange={this.onInputChangeHandler}
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
									onChange={this.onInputChangeHandler}
									value={this.state.password}
									type="password"
									placeholder="Password"
									id="password"
									className="form-control"
								/>
							</div>
							<button onClick={this.submitHandler} className="btn btn-success">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	token: state.auth.token
});

export default connect(mapStateToProps, { register })(SignUp);
