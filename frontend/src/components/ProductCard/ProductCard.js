import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard(props) {
	return (
		<div className="card shadow h-100" key={props.id}>
			<Link to={'/product/' + props.id}>
				<img className="card-img-top" src={props.image} alt={props.title} />
			</Link>
			<div className="card-body position-relative h-100">
				<div className={styles.Price + ' bg-primary text-white px-3 py-1 rounded shadow text-center'}>
					<p className="mb-0">{props.price}$</p>
				</div>
				<h4 className="card-title">{props.title}</h4>
				<p className="card-text">{props.description}</p>
			</div>
		</div>
	);
}
