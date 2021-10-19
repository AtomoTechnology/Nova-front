import React from 'react';

export const Alert = ({ data }) => {
	return (
		<div className="alert notification">
			<span className="msg">{data.msg}</span>
			<span className="icons">
				{data.type == 'success' ? (
					<i class="fas fa-check-circle success"></i>
				) : (
					<i class="fas fa-exclamation-triangle error"></i>
				)}
			</span>
		</div>
	);
};
