import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../../utils/axiosInstance';
import { Link } from 'react-router-dom';
import Pill from '../Pill';
import { setAlert } from '../../../../store/actions/alert';
import { removeFromCart, addToCart } from '../../../../store/actions/global';
import Spinner from '../../../UI/Spinner/Spinner';

class Product extends Component {
	state = {
		product: null,
		quantity: 1,
		loading: false
	};

	componentDidMount() {
		const productId = this.props.match.params.id;
		let product = this.props.global.products.filter((item) => item._id === productId);
		if (!product[0]) {
			this.setState({ loading: true });
			axios
				.get(`/api/product/${productId}`)
				.then((res) => {
					this.setState({ product: res.data });
					this.checkCart();
				})
				.catch((err) => console.log('err', { ...err }))
				.then(() => {
					this.setState({ loading: false });
				});
		} else {
			this.setState({ product: product[0] });
		}
	}

	incrementQuantity = () => {
		this.setState((state) => {
			return { quantity: state.quantity + 1 };
		});
	};

	decrementQuantity = () => {
		if (this.state.quantity > 1) {
			this.setState((state) => {
				return { quantity: state.quantity - 1 };
			});
		}
	};

	deleteProduct = async () => {
		try {
			await axios.delete(`/api/company/${this.props.match.params.id}`);
			this.props.setAlert('Product Removed From Cart', 'success');
			this.props.history.push('/company/products');
		} catch (err) {
			console.error('[Product.js] deleteProduct', { ...err });
		}
	};

	addToCart = () => {
		this.props.addToCart(this.state.product._id, this.state.quantity);
	};

	removeFromCart = () => {
		this.props.removeFromCart(this.state.product._id);
	};

	render() {
		const { product, loading, quantity } = this.state;
		let productComponent = loading ? (
			<Spinner />
		) : (
			<div className="my-5 alert alert-danger w-100 p-3" role="alert">
				<p>Something went wrong.</p>
				<Link className="alert-link" to="/">
					Go to Home Page
				</Link>
			</div>
		);
		const buttons =
			this.props.auth.userType === 'user' ? (
				<div className="d-flex flex-wrap">
					<div className="col-4 pl-0">
						<button onClick={this.addToCart} className="btn btn-primary btn-lg btn-block">
							BUY
						</button>
					</div>
					<div className="col-4 px-0 d-flex justify-content-between">
						<button onClick={this.incrementQuantity} className="btn btn-outline-success col-4">
							+
						</button>
						<div className="rounded mx-1 bg-secondary col-4 d-flex align-items-center justify-content-center">
							<span className="text-white">{quantity}</span>
						</div>
						<button onClick={this.decrementQuantity} className="btn btn-outline-danger col-4">
							-
						</button>
					</div>
					<div className="col-4">
						<button onClick={this.removeFromCart} className="btn btn-danger btn-lg btn-block">
							REMOVE
						</button>
					</div>
				</div>
			) : product && product.companyRef === this.props.auth.id ? (
				<div className="d-flex flex-wrap">
					<div className="col-6 pl-0">
						<button onClick={this.deleteProduct} className="btn btn-block btn-lg btn-danger">
							DELETE PRODUCT
						</button>
					</div>
					<div className="col-6 pr-0">
						<Link
							to={`/company/create-product/${product._id}`}
							className="btn btn-block btn-lg btn-warning"
						>
							EDIT PRODUCT
						</Link>
					</div>
				</div>
			) : (
				<Pill content={'Please Login in as an User'} />
			);
		if (product) {
			productComponent = (
				<React.Fragment>
					<div className="col-md-6">
						<img className="img-fluid rounded shadow" src={product.imageUrl} alt="Card-Id" />
					</div>
					<div className="col-md-6">
						<Pill content={'Review Stars: Maybe Later'} />
						<Pill content={'Price: ' + product.price + '$'} />
						{buttons}
					</div>
					<div className="col-12 my-3 mx-3 p-3 shadow">
						<h1>{product.title}</h1>
						<p>{product.description}</p>
					</div>
				</React.Fragment>
			);
		}
		return (
			<div className="container my-5">
				<div className="row">{productComponent}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	global: state.global,
	auth: state.auth
});

export default connect(mapStateToProps, { setAlert, removeFromCart, addToCart })(Product);
