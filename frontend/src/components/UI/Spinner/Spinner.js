import React from 'react';
import styles from './Spinner.module.css';

export default function Spinner() {
	return (
		<div className="text-center">
			<div className={styles.Loader}>
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
}
