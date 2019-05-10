import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { registerUser } from '../../store/actions/auth';

class SignUp extends Component {
	state = {
		name: '',
		email: '',
		password: ''
	};

	onInputChangeHandler = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	submitHandler = (e) => {
		e.preventDefault();
		console.log(this.state);
		this.props.registerUser(this.state);
	};

	render() {
		const loader = this.props.loading ? <Spinner /> : null;
		return (
			<div className="container my-5">
				<div className="row justify-content-center">
					<div className="col-md-6 shadow p-5 rounded">
						{loader}
						<h1>Sign Up</h1>
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

export default connect(mapStateToProps, { registerUser })(SignUp);
