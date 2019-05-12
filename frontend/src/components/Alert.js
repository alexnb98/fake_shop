import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './UI/Spinner/Spinner';

const Alert = ({ alerts, global }) => {
	let alertsDiv = null;
	if (alerts !== null && alerts.length > 0) {
		alertsDiv = alerts.map((alert) => {
			return (
				<div className={`shadow alert alert-${alert.alertType}`} key={alert.id} role="alert">
					{alert.msg}
				</div>
			);
		});
	}
	const loader = global.loading ? <Spinner /> : null;
	return (
		<div className="container position-absolute" style={{ left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
			<div className="row justify-content-center">
				<div className="col-md-6">{alertsDiv}</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-md-6">{loader}</div>
			</div>
		</div>
	);
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
	global: state.global
});

export default connect(mapStateToProps)(Alert);
