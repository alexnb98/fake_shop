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
		loading: false,
		inCart: false
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
				})
				.catch((err) => console.log('err', err))
				.then(() => {
					this.setState({ loading: false });
				});
		} else {
			this.setState({ product: product[0] });
		}
	}

	componentDidUpdate() {
		//TODO: IMPROVE THIS CODE
		if (this.props.global.cart && this.props.global.cart.length > 0 && !this.state.inCart) {
			const prodIndex = this.props.global.cart
				.map((item) => {
					console.log('item.product._id', item.product._id);
					return item.product._id;
				})
				.indexOf(this.state.product._id);
			console.log('this.state.product._id', this.state.product._id);
			console.log('prodIndex', prodIndex);
			if (prodIndex !== -1) {
				this.setState({ quantity: this.props.global.cart[prodIndex].quantity, inCart: true });
			}
		}
		console.log('componendiddupdate');
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

	render() {
		const { product, inCart, loading, quantity } = this.state;
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
		if (product) {
			const itemInCart = inCart ? (
				<div className="alert alert-success">This item is in your Cart</div>
			) : (
				<div className="alert alert-secondary">This item is not in your cart</div>
			);

			productComponent = (
				<React.Fragment>
					<div className="col-md-6">
						<img className="img-fluid rounded shadow" src={product.imageUrl} alt="Card-Id" />
					</div>
					<div className="col-md-6">
						<Pill content={'Review Stars: Maybe Later'} />
						<Pill content={'Price: ' + product.price + '$'} />
						<div className="d-flex flex-wrap">
							<div className="col-4 pl-0">
								<button
									onClick={() => this.props.addToCart(this.state.product._id, this.state.quantity)}
									className="btn btn-primary btn-lg btn-block"
								>
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
								<button
									onClick={() => this.props.removeFromCart(product._id)}
									className="btn btn-danger btn-lg btn-block"
								>
									REMOVE
								</button>
							</div>
							<div className="col-12 my-3 px-0">{itemInCart}</div>
						</div>
					</div>
					<div className="col-12 my-3 mx-3 p-3 shadow">
						<h1>{product.title}</h1>
						<p>{product.description}</p>
					</div>
					{product.companyRef === this.props.auth.id ? (
						<div className="mt-3">
							<button onClick={this.deleteProduct} className="btn btn-danger btn-lg mr-3">
								DELETE PRODUCT
							</button>
							<Link to={`/company/create-product/${product._id}`} className="btn btn-warning btn-lg">
								EDIT PRODUCT
							</Link>
						</div>
					) : null}
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
