import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logoNova from '../../templatePics/logo03.png';

const Footer = () => {
  const { role } = useSelector((state) => state.auth);

  return (
    <div className="footer ">
      <div className="footer-container flex-col  flex sm:flex-row justify-between items-center">
        <ul className="flex gap-4">
          <li className="hover:text-red-500 duration-100">
            <Link to="/">Inicio</Link>
          </li>
          <li className="hover:text-red-500 duration-100">
            <Link to="/terms-conditions">Terminos y Condiciones</Link>
          </li>

          {role === 'admin' && (
            <li className="hover:bg-red-500 text-white bg-red-700 p-2 duration-100">
              <a href="tel:+549 3417207882">Llamar a Hilaire</a>
            </li>
          )}
        </ul>
        <ul className="footer-list">
          <span className="text-red-400 text-lg"> &copy; NovaTechnology {new Date().getFullYear()}</span>
          <img src={logoNova} width="30" alt="Nova Logo" />
        </ul>
      </div>
    </div>
  );
};

export default Footer;
