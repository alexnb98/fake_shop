import React, { Component } from 'react';
import Products from './Products/Products';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../../store/actions/global';

class Landing extends Component {
	componentDidMount() {
		this.props.getProducts();
		if (this.props.auth.userType === 'user') {
			this.props.getCart();
		}
	}

	render() {
		const { loading, products } = this.props.global;
		let show = !products ? <div>No products found</div> : <Products products={products} />;

		return (
			<React.Fragment>
				<div className="jumbotron">
					<div className="container">
						<h1 className="display-4">All Products</h1>
						<p className="lead">
							This is a simple hero unit, a simple jumbotron-style component for calling extra attention
							to featured content or information.
						</p>
					</div>
				</div>
				{loading ? null : show}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	global: state.global,
	auth: state.auth
});

export default connect(mapStateToProps, { getProducts, getCart })(Landing);
