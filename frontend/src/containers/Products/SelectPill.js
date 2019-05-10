import React from 'react';

export default function SelectPill(props) {
	const options = props.numbers.map((item, i) => (
		<option key={i} value={item}>
			{item}
		</option>
	));
	return (
		<select onChange={props.change} value={props.value} className="form-control h-100">
			{options}
		</select>
	);
}
