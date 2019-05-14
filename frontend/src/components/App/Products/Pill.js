import React from 'react';

export default function Pill(props) {
	return (
		<div className="mb-3 p-3 shadow-sm bg-light">
			<h2>{props.content}</h2>
		</div>
	);
}
