import React, { Component } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

class Products extends Component {
	render() {
		const products =
			this.props.products &&
			this.props.products.map((product) => {
				return (
					<div className="col-md-4 my-3" key={product._id}>
						<ProductCard
							title={product.title}
							id={product._id}
							description={product.description}
							image={product.image}
							price={product.price}
						/>
					</div>
				);
			});
		const noProducts = <h2>No Products Found</h2>;

		return (
			<div>
				<div className="container my-5">
					<div className="row">{products.length > 0 ? products : noProducts}</div>
				</div>
			</div>
		);
	}
}

export default Products;
