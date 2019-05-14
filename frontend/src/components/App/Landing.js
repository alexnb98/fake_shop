import React, { Component } from 'react';
import Products from './Products/Products';
import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/global';

class Landing extends Component {
	componentDidMount() {
		this.props.getProducts();
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
	global: state.global
});

export default connect(mapStateToProps, { getProducts })(Landing);
