import React from 'react';
import { NavLink } from 'react-router-dom';

export default function navbar(props) {
	let numberOfItems = null;
	if (props.items > 0) {
		numberOfItems = <span className="badge badge-danger">{props.items}</span>;
	}
	return (
		<div className="py-2 bg-primary">
			<div className="container">
				<nav className="d-flex align-items-center justify-content-between">
					<div>
						<NavLink className="navbar-brand text-white" to="/">
							Fake Shop
						</NavLink>
					</div>
					<div>
						<NavLink to="/new-product" className="btn btn-light mx-2">
							Sell Product
						</NavLink>
						<NavLink to="/cart" className="btn btn-light mx-2">
							Cart {numberOfItems}
						</NavLink>
						<NavLink to="login" className="btn btn-outline-light mx-2">
							Login
						</NavLink>
						<NavLink to="signup" className="btn btn-outline-light mx-2">
							Sign up
						</NavLink>
					</div>
				</nav>
			</div>
		</div>
	);
}
