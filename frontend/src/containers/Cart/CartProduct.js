import React from 'react';
import styles from './CartProduct.module.css';
import { Link } from 'react-router-dom';

export default function ShopingCartProduct(props) {
	return (
		<div className="d-flex flex-wrap my-5 shadow-sm position-relative">
			<div onClick={props.click} className={styles.Close} />
			<div className="col-3 pl-0">
				<Link to={`/product/${props.id}`}>
					<img className="img-fluid rounded shadow" src={props.image} alt={props.title} />
				</Link>
			</div>
			<div className="col-6 py-3">
				<h4 className="mb-2">{props.title}</h4>
			</div>
			<div className="col-3 d-flex flex-column justify-content-around pr-5">
				<div className="rounded border p-3">
					<p className="mb-0">Quantity: {props.number}</p>
				</div>
				<div className="rounded border p-3">
					<p className="mb-0">Price: {props.price}$</p>
				</div>
			</div>
		</div>
	);
}
