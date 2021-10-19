import React from 'react';
import moment from 'moment';
export const Gasto = ({ gasto }) => {
	return (
		<div className="gasto">
			<i class="fas fa-dollar-sign"></i>
			<div className="gasto-content">
				<h5>{gasto.description} </h5>
				<div className="amout-date">
					<span className="amount"> - ${gasto.amount}</span>
					<span className="date">
						{moment(gasto?.date).format('DD-MM-yyyy')}
					</span>
				</div>
			</div>
		</div>
	);
};
