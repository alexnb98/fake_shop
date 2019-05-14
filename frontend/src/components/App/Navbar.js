import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

const Navbar = function(props) {
	let numberOfItems = null;
	if (props.items > 0) {
		numberOfItems = <span className="badge badge-danger">{props.items}</span>;
	}
	const userLinks = (
		<React.Fragment>
			<NavLink to="/user/cart" className="btn btn-light mx-2">
				Cart {numberOfItems}
			</NavLink>
			<NavLink to="/user/orders" className="btn btn-light mx-2">
				Orders
			</NavLink>
			<Link to="/" className="btn btn-light mx-2" onClick={props.logout}>
				Logout
			</Link>
		</React.Fragment>
	);
	const companyLinks = (
		<React.Fragment>
			<NavLink to="/company/products" className="btn btn-light mx-2">
				My Products
			</NavLink>
			<NavLink to="/company/create-product" className="btn btn-light mx-2">
				Create Product
			</NavLink>
			<Link to="/" className="btn btn-light mx-2" onClick={props.logout}>
				Logout
			</Link>
		</React.Fragment>
	);

	const guestLinks = (
		<React.Fragment>
			<NavLink to="login" className="btn btn-outline-light mx-2">
				Login
			</NavLink>
			<NavLink to="signup" className="btn btn-outline-light mx-2">
				Sign up
			</NavLink>
		</React.Fragment>
	);
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
						{props.auth.userType === false ? guestLinks : null}
						{props.auth.userType === 'user' ? userLinks : null}
						{props.auth.userType === 'company' ? companyLinks : null}
					</div>
				</nav>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
