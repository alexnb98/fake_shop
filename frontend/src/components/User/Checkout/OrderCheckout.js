import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { makeOrder } from '../../../store/actions/global';
import { connect } from 'react-redux';

class OrderCheckout extends Component {
	state = {
		userAddress: ''
	};

	inputChangeHandler = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	submitHandler = async (e) => {
		e.preventDefault();
		this.props.makeOrder(this.state);
	};

	render() {
		return (
			<div>
				<div className="p-3 rounded bg-light shadow my-3">
					<h2 className="text-center mb-3">Make the Order</h2>
					<p className="display-4">Total: {this.props.totalPrice}$</p>
					<form onSubmit={this.submitHandler}>
						<div className="form-group">
							<label htmlFor="userAddress">Your Address</label>
							<input
								onChange={this.inputChangeHandler}
								value={this.state.userAddress}
								type="text"
								placeholder="Berlin 123"
								id="userAddress"
								className="form-control"
								required
							/>
						</div>

						<button type="submit" className="btn btn-success mr-3">
							Make Order
						</button>
						<Link to="/user/orders" className="btn btn-outline-success">
							See your Orders
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	global: state.global
});

export default connect(mapStateToProps, { makeOrder })(OrderCheckout);
