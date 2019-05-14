import React from 'react';

export default function OrderItems({ order }) {
	const products =
		order &&
		order.cart.map((item) => {
			return (
				<div key={item.product._id} className="my-3 bg-white">
					<div className="d-flex flex-wrap p-3 border">
						<div className="col-md-8">
							<p>
								<strong>{item.product.title}</strong>
							</p>
							<p>{item.product.description}</p>
						</div>
						<div className="col-md-4 text-right">
							<p>Price: {item.product.price}</p>
							<p>Quantity: {item.quantity}</p>
						</div>
					</div>
				</div>
			);
		});
	return (
		<div className="my-3 shadow rounded p-3 bg-light">
			<div className="d-flex flex-wrap pb-2 border-bottom">
				<div className="col-md-6">
					<p>
						<strong>Name:</strong> {order.userName}
					</p>
					<p>
						<strong>Email:</strong> {order.userEmail}
					</p>
					<p>
						<strong>Address:</strong> {order.userAddress}
					</p>
				</div>
				<div className="col-md-6">
					<p>Date: {order.date} </p>
				</div>
			</div>
			<br />
			<h3>Cart</h3>
			{order ? products : 'ERROR'}
		</div>
	);
}
