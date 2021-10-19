import React from 'react';
import logoNova from '../../templatePics/logo03.png';

export const Footer = () => {
	return (
		<div className="footer ">
			<div className="footer-container">
				<ul className="footer-list">
					<span className="text-red-400 text-lg">
						{' '}
						&copy; NovaTechnology {new Date().getFullYear()}
					</span>
					<img src={logoNova} width="30" alt="Nova Logo" />
				</ul>
			</div>
		</div>
	);
};
