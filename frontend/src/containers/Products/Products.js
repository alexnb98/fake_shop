import React, { Component } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/products';
import Spinner from './../../components/UI/Spinner/Spinner';

class Products extends Component {
	componentDidMount() {
		this.props.getProducts();
	}

	render() {
		const products = this.props.products.loading ? (
			<Spinner />
		) : (
			this.props.products.products.map((product) => {
				return (
					<div className="col-md-4 my-3" key={product.id}>
						<ProductCard
							title={product.title}
							id={product._id}
							description={product.description}
							image={product.image}
							price={product.price}
						/>
					</div>
				);
			})
		);

		return (
			<div>
				<div className="jumbotron">
					<div className="container">
						<h1 className="display-4">All Products</h1>
						<p className="lead">
							This is a simple hero unit, a simple jumbotron-style component for calling extra attention
							to featured content or information.
						</p>
					</div>
				</div>

				<div className="container my-5">
					<div className="row">{products}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	};
};

export default connect(mapStateToProps, { getProducts })(Products);
