import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pill from './Pill';
import SelectPill from './SelectPill';
import { setAlert } from '../../store/actions/alert';

class Product extends Component {
	state = {
		product: null,
		loading: false
	};

	componentDidMount() {
		const productId = this.props.match.params.id;
		let product = this.props.general.products.filter((item) => item._id === productId);
		if (!product[0]) {
			axios
				.get(`/api/product/${productId}`)
				.then((res) => {
					console.log('res', res);
					this.setState({ product: res.data });
				})
				.catch((err) => console.log('err', err));
		} else {
			this.setState({ product: product[0] });
		}
	}

	deleteProduct = async () => {
		try {
			await axios.delete(`/api/company/${this.props.match.params.id}`);
			this.props.setAlert('Product Deleted', 'success');
			this.props.history.push('/company/products');
		} catch (err) {
			console.error({ ...err });
		}
	};

	render() {
		const { product } = this.props.general;
		let productComponent = (
			<div className="my-5 alert alert-danger w-100 p-3" role="alert">
				<p>Something went wrong.</p>
				<Link className="alert-link" to="/">
					Go to Home Page
				</Link>
			</div>
		);
		if (product) {
			productComponent = (
				<React.Fragment>
					<div className="col-md-6">
						<img className="img-fluid rounded shadow" src={product.image} alt="Card-Id" />
					</div>
					<div className="col-md-6">
						<Pill content={'Review Stars: ' + product.stars} />
						<Pill content={'Price: ' + product.price + '$'} />
						<div className="d-flex flex-wrap">
							<div className="col-4 pl-0">
								<button
									onClick={() => this.props.onAddItem({ ...this.state.product, ...product })}
									className="btn btn-primary btn-lg btn-block"
								>
									BUY
								</button>
							</div>
							<div className="col-4">
								<SelectPill
									change={this.numberChangeHandler}
									value={this.state.number}
									numbers={[ 1, 2, 3, 4, 5 ]}
								/>
							</div>
							<div className="col-4">
								<button
									onClick={() => this.props.onRemoveItem(product.id)}
									className="btn btn-danger btn-lg btn-block"
								>
									REMOVE
								</button>
							</div>
							{/* <div className="col-12 my-3 px-0">{itemInCart}</div> */}
						</div>
					</div>
					<div className="col-12 my-3 mx-3 p-3 shadow">
						<h1>{product.title}</h1>
						<p>{product.description}</p>
						<p>Company Ref: {product.companyRef}</p>
					</div>
					{product.companyRef === this.props.auth.id ? (
						<div className="mt-3">
							<button onClick={this.deleteProduct} className="btn btn-danger btn-lg mr-3">
								DELETE PRODUCT
							</button>
							<button className="btn btn-warning btn-lg">EDIT PRODUCT</button>
						</div>
					) : null}
				</React.Fragment>
			);
		}
		return (
			<div>
				<div className="container my-5">
					<div className="row">{productComponent}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	general: state.general,
	auth: state.auth
});

export default connect(mapStateToProps, { setAlert })(Product);
