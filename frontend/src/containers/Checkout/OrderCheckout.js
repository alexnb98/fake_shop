import React from 'react';

export default function OrderCheckout(props) {
	return (
		<div className="p-3 rounded bg-light shadow my-3">
			<h2 className="text-center mb-3">Make the Order</h2>
			<p>Total: {props.totalPrice}</p>
		</div>
	);
}
