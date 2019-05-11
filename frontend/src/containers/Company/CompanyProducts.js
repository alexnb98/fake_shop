import React, { Component } from 'react';
import Products from '../Products/Products';
import Spinner from './../../components/UI/Spinner/Spinner';
import { getProducts } from '../../store/actions/company';
import { connect } from 'react-redux';

class CompanyProducts extends Component {
	componentDidMount() {
		if (this.props.company.products && this.props.company.products.length <= 0) {
			this.props.getProducts();
		}
	}

	render() {
		const { products, loading } = this.props.company;
		let show = !products ? <div>No products found</div> : <Products products={products} />;
		return (
			<React.Fragment>
				<div className="jumbotron">
					<div className="container">
						<h1 className="display-4">All Your Products</h1>
						<p className="lead">See all the Products your selling</p>
					</div>
				</div>
				{loading ? <Spinner /> : show}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	company: state.company
});

export default connect(mapStateToProps, { getProducts })(CompanyProducts);
