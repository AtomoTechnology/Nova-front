import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

export const History = ({ work }) => {
	return (
		<tr className="history p-2 bg-gray-200 hover:text-white hover:bg-gray-800 duration-900 shadow cursor-pointer">
			<td className="text-green-500 flex-1 hover:text-green-400 hover:underline">
				<Link to={`/works/${work?._id}`}>{work?.codigo}</Link>
			</td>
			<td className="flex-1 p-2">{work?.marca + ' - ' + work.modelo}</td>
			<td className="flex-1 p-2 capitalize">{work?.cliente?.name}</td>
			<td className="flex-1 p-2">{'$ ' + work?.total}</td>
			<td className="flex-1 p-2">
				{work?.fechaFin ? moment(work?.fechaFin).format('DD-MM-YYYY') : '--'}
			</td>
		</tr>
	);
};
