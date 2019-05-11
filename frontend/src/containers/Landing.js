import React, { Component } from 'react';
import Products from './Products/Products';
import { connect } from 'react-redux';
import { getProducts } from '../store/actions/general';
import Spinner from './../components/UI/Spinner/Spinner';

class Landing extends Component {
	componentDidMount() {
		if (this.props.general.products && this.props.general.products.length <= 0) {
			this.props.getProducts();
		}
	}

	render() {
		const { loading, products } = this.props.general;
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
				{loading ? <Spinner /> : show}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	general: state.general
});

export default connect(mapStateToProps, { getProducts })(Landing);
