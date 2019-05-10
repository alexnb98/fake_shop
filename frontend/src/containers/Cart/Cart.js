import React, { Component } from 'react';
import CartProduct from './CartProduct';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderCheckout from '../Checkout/OrderCheckout';
import { getCart } from '../../store/actions/user';

class Cart extends Component {
	componentDidMount() {
		this.props.getCart();
	}

	render() {
		const { cart } = this.props;
		let inCartProducts = (
			<div className="p-5 shadow rounded text-center">
				<p className="display-4">Your Cart is Empty</p>
				<Link to="/" className="btn btn-outline-primary btn-lg">
					Start Shoping
				</Link>
			</div>
		);
		let order = null;
		if (cart.length) {
			const totalPrice = cart.reduce((acc, cur) => {
				return acc + cur.product.price * cur.number;
			}, 0);
			order = <OrderCheckout totalPrice={totalPrice} />;
			inCartProducts = cart.map((item) => {
				return (
					<CartProduct
						key={item.product._id}
						title={item.product.title}
						// click={() => this.props.onRemoveItem(item.id)}
						price={item.product.price}
						image={item.product.image}
						color={item.product.color}
						number={item.product.number}
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
		cart: state.user.cart
	};
};
export default connect(mapStateToProps, { getCart })(Cart);
