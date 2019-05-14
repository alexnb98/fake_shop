import React, { Component } from 'react';
import Products from '../App/Products/Products';
import Spinner from '../UI/Spinner/Spinner';
import { getCompanyProducts } from '../../store/actions/global';
import { connect } from 'react-redux';

class CompanyProducts extends Component {
	componentDidMount() {
		const id = this.props.match.params.id;
		if (id) {
			this.props.getCompanyProducts(id);
		} else {
			this.props.getCompanyProducts();
		}
	}

	render() {
		const { companyProducts, loading } = this.props.global;
		let show = !companyProducts ? <div>No products found</div> : <Products products={companyProducts} />;
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
	global: state.global
});

export default connect(mapStateToProps, { getCompanyProducts })(CompanyProducts);
