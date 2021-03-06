import React, { Component } from 'react';
import CartProduct from './CartProduct';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderCheckout from '../Checkout/OrderCheckout';
import { getCart, removeFromCart } from '../../../store/actions/global';

class Cart extends Component {
	componentDidMount() {
		this.props.getCart();
	}

	render() {
		const loading = this.props.global.loading;
		let inCartProducts = loading ? null : (
			<div className="p-5 shadow rounded text-center">
				<p className="display-4">Your Cart is Empty</p>
				<Link to="/" className="btn btn-outline-primary btn-lg">
					Start Shoping
				</Link>
				<div className="my-3 border-bottom" />
				<p className="display-4">See your Orders</p>
				<Link to="/user/orders" className="btn btn-outline-success btn-lg">
					Orders
				</Link>
			</div>
		);
		let order = null;
		if (this.props.global.cart && this.props.global.cart.length) {
			const totalPrice = this.props.global.cart.reduce((acc, cur) => {
				return acc + cur.product.price * cur.quantity;
			}, 0);
			order = <OrderCheckout totalPrice={totalPrice.toFixed(2)} />;
			inCartProducts = this.props.global.cart.map((item) => {
				return (
					<CartProduct
						key={item.product._id}
						id={item.product._id}
						title={item.product.title}
						click={() => this.props.removeFromCart(item.product._id)}
						price={item.product.price}
						image={item.product.imageUrl}
						color={item.product.color}
						number={item.quantity}
					/>
				);
			});
		}
		return (
			<div className="container my-5">
				<div className="position-absolute" />
				<div className="jumbotron">
					<h1 className="display-4">Your Shoping Cart</h1>
				</div>
				{inCartProducts}
				{order}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		global: state.global
	};
};
export default connect(mapStateToProps, { getCart, removeFromCart })(Cart);
