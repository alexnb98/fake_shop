import React from 'react';

export default function OrderItems({ order }) {
	const products = order.cart.map((item) => {
		return (
			<div key={item.product._id}>
				<p>Title: {item.product.title}</p>
				<p>Price: {item.product.price}</p>
				<p>Description: {item.product.description}</p>
				<p>Quantity: {item.quantity}</p>
			</div>
		);
	});
	return (
		<div className="my-3 shadow rounded p-3 bg-light">
			<h2>Name: {order.userName}</h2>
			<h3>Email: {order.userEmail}</h3>
			<h3>Address: {order.userAddress}</h3>
			<p>Date: {order.date} </p>
			<br />
			<h3>Cart</h3>
			{products}
		</div>
	);
}
