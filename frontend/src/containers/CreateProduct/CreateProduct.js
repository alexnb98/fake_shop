import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { setAlert } from '../../store/actions/alert';

import axios from 'axios';

class CreateProduct extends Component {
	state = {
		product: {
			title: '',
			description: '',
			imageUrl: '',
			price: 0
		},
		loading: false
	};

	inputChangeHandler = (e) => {
		const product = { ...this.state.product };
		product[e.target.id] = e.target.value;
		this.setState({ product });
	};

	submitHandler = async (e) => {
		e.preventDefault();
		try {
			this.setState({ loading: true });
			const body = JSON.stringify(this.state.product);
			const config = { headers: { 'Content-Type': 'application/json' } };
			await axios.post('/api/company/create', body, config);
			this.props.setAlert('Created Product', 'success');
		} catch (err) {
			const error = err.response.data.msg;
			if (error) this.props.setAlert(error, 'danger');
			const errors = err.response.data.errors;
			if (errors) errors.forEach((error) => this.props.setAlert(error.msg, 'danger'));
		} finally {
			this.setState({ loading: false });
		}
	};
	render() {
		let loading = this.state.loading ? <Spinner /> : null;
		return (
			<div className="container my-5">
				<div className="row justify-content-center">
					<div className="col-md-6 rounded shadow p-5">
						{loading}
						<h1>Create New Product</h1>
						<hr />
						<form>
							<div className="form-group">
								<label htmlFor="title">Title</label>
								<input
									onChange={this.inputChangeHandler}
									value={this.state.title}
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
									value={this.state.price}
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
									value={this.state.imageUrl}
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
									value={this.state.description}
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
export default connect(null, { setAlert })(CreateProduct);
