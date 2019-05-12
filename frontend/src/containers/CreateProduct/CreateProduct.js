import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { createProduct, updateProduct } from '../../store/actions/global';

class CreateProduct extends Component {
	state = {
		product: {
			title: '',
			description: '',
			imageUrl: '',
			price: 0,
			_id: ''
		},
		loading: false,
		update: false
	};

	componentWillMount() {
		const id = this.props.match.params.id;
		console.log('id', id);
		if (id) {
			// Get product from state
			const products = this.props.global.companyProducts;
			const productIndex = products.map((product) => product._id).indexOf(id);
			const product = products[productIndex];
			if (productIndex !== -1) {
				this.setState({ product, update: true });
			}
		}
	}

	inputChangeHandler = (e) => {
		const product = { ...this.state.product };
		product[e.target.id] = e.target.value;
		this.setState({ product });
	};

	submitHandler = async (e) => {
		e.preventDefault();
		if (this.state.update) {
			this.props.updateProduct(this.state.product);
		} else {
			this.props.createProduct(this.state.product);
		}
	};
	render() {
		let loading = this.props.global.loading ? <Spinner /> : null;
		const { product, update } = this.state;
		return (
			<div className="container my-5">
				<div className="row justify-content-center">
					<div className="col-md-6 rounded shadow p-5">
						{loading}
						<h1>{update ? 'Update' : 'Create New'} Product</h1>
						<hr />
						<form>
							<div className="form-group">
								<label htmlFor="title">Title</label>
								<input
									onChange={this.inputChangeHandler}
									value={product.title}
									type="text"
									placeholder="Title"
									id="title"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="price">Price</label>
								<input
									onChange={this.inputChangeHandler}
									value={product.price}
									type="number"
									placeholder="Price"
									id="price"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="imageUrl">Image Url</label>
								<input
									onChange={this.inputChangeHandler}
									value={product.imageUrl}
									type="text"
									placeholder="http://"
									id="imageUrl"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="description">Description</label>
								<textarea
									onChange={this.inputChangeHandler}
									value={product.description}
									name="description"
									id="description"
									className="form-control"
								/>
							</div>
							<button onClick={this.submitHandler} className="btn btn-success">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	global: state.global
});

export default connect(mapStateToProps, { createProduct, updateProduct })(CreateProduct);
