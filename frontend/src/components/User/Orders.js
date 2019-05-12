import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../store/actions/global';
import OrderItems from './OrderItems';

class Orders extends Component {
	componentDidMount() {
		this.props.getOrders();
	}

	render() {
		const orders = this.props.global.orders;
		const ordersRender = orders.map((order) => {
			return <OrderItems key={order._id} order={order} />;
		});
		return (
			<div className="container my-5">
				<div className="position-absolute" />
				<div className="jumbotron">
					<h1 className="display-4">Your Orders</h1>
				</div>
				{ordersRender}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	global: state.global
});

export default connect(mapStateToProps, { getOrders })(Orders);
