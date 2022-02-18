import moment from 'moment';
import React, { useEffect } from 'react';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneWork } from '../../action/worksAction';

import nova from './../../templatePics/logoNovaSmall.png';
import { useState } from 'react';

const OrderWork = ({ match, history }) => {
  const workId = match.params.id;
  const dispatch = useDispatch();
  // console.log(history);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getOneWork(workId));
  }, [dispatch, workId]);

  const download = useRef(null);
  const body = useRef(null);
  const downloadPdf = () => {
    setLoading(true);
    body.current.save();
    setLoading(false);
    // savePDF(body.current, { paperSize: 'A4' });
  };
  const { work } = useSelector((state) => state.works);

  return (
    <div>
      <div className="download-box">
        <button
          onClick={() => {
            history.goBack();
          }}
          className="btn-1"
        >
          Volver
        </button>
        <button className="btn-2" onClick={downloadPdf}>
          {loading ? 'DESCARGANDO...' : 'DESCARGAR'}
        </button>
      </div>
      <PDFExport ref={body}>
        <div className="pdf">
          <header>
            <div className="info-header">
              <h3>SERVICIO Y REPARACIÓN DE TELÉFONOS CELULARES</h3>
              <p>CUIT: 20-37308578-3</p>
              <p>TRABICHET NICOLAS MAXIMILIANO</p>
              <p>JUJUY 1692 Piso:2 Dpto:A</p>
              <p>ROSARIO</p>
              <p>2000-SANTA FE</p>
            </div>
            <div className="logo-nova">
              <img src={nova} width={100} alt="Logo Nova" />
              <section className="main-header">
                <div className="fecha-orden">
                  <h3>Nro Orden :{work?.codigo}</h3>
                  <h3 className="orden-fecha">Fecha :{moment(new Date()).format('DD-MM-YYYY')}</h3>
                  <span>Cliente : {work?.cliente?.name} </span>
                  <span> DNI : {work?.cliente?.dni}</span>
                </div>
              </section>
            </div>
          </header>
          <h3 className="p-1">PRESUPUESTO Y DIAGNÓSTICO TÉCNICO:</h3>

          <main className="main-content">
            <div className="main-content-data">
              {/* <section className="datos-cliente">
                <h4>Datos del Cliente</h4>
                <div className="cliente">
                  <span>Direccion :${work?.cliente?.direction}</span>
                  <span>Localidad :</span>
                  <span>telefono :${work?.cliente?.phone1}</span>
                  <span>E_mail :</span>
                </div>
              </section> */}
              <section className="datos-equipo">
                <h2>Datos del Equipo</h2>
                <div className="equipo">
                  <span>Marca/modelo :{work?.marca + ' - ' + work?.modelo} </span>
                  <span>Imei : {work?.emei}</span>
                  {work?.tieneContraseña ? (
                    <span>Contraseña :{work?.contrasena}</span>
                  ) : work?.esPatron ? (
                    <span>Patron :{work?.patron}</span>
                  ) : null}
                  <span>Total : {work?.total} </span>
                  <span>Observaciones : {work?.observaciones}</span>
                  <span>Falla Encontrada : {work?.fachasEncontradas}</span>
                  <span>Descripcion: {work?.descripcion}</span>
                  {/* <span>Garantia de reparacion: 3 meses</span> */}
                  {/* <span>El equipo enciende :...</span> */}
                </div>
              </section>
            </div>
            <section className="leyes-box">
              <h3>BASES Y CONDICIONES:</h3>
              <ol className="leyes">
                <li>
                  La comunicación de la aceptación del presupuesto puede ser vía telefónica, correo electrónico o
                  presencial.
                </li>
                <li>
                  Para retirar el equipo es imprescindible presentar la ORDEN DE SERVICIO TÉCNICO y el abono
                  correspondiente al servicio efectuado.
                </li>
                <li>Todo trabajo solicitado como “urgente”, tendrá un costo adicional.</li>
                <li>
                  Toda reparación efectuada tiene una garantía de 3 meses, contados desde la fecha de entrega, quedando
                  excluidas las fallas por: mala manipulación, roturas o golpes, sobretensión o evidencia de residuos
                  líquidos, humedad, o si el equipo fue intervenido por un tercero. Los equipos que ingresan mojados, no
                  son sujetos a garantía.
                </li>
                <li>
                  e invocar la garantía del equipo, nuestro servicio técnico evaluará el funcionamiento del mismo y
                  decidirá si aplica o no, y en caso de hacerla efectiva el cliente deberá presentar toda la
                  documentación que se le ha entregado (incluyendo: Orden de servicio y boleta o comprobante de pago
                  entregada).
                </li>
                <li>
                  Todos los equipos llegados a este servicio técnico se considerarán fuera de garantía y por tanto la
                  reparación se facturará de acuerdo con las tarifas vigentes.
                </li>
                <li>
                  La empresa solo se hace responsable por la reparación o servicio detallado en la orden de servicio,
                  pudiendo agregar nuevos ítems si así fuera necesario, informando previamente al cliente.
                </li>
                <li>
                  El servicio técnico no se hace responsable de los datos o información contenida en los equipos puestos
                  a su disposición, ni de cualquier supuesta pérdida de datos en cualquiera de las unidades de
                  almacenamiento. De ser necesario realizar un resguardo de información, el cliente deberá solicitar
                  dicho servicio.
                </li>
                <li>
                  Si pasado los 30 días, el propietario no retira sus componentes, el costo sufre un incremento del 10%;
                  pasados los 60 días, 20%; pasados los 90 días el propietario pierde el derecho a reclamar sus
                  componentes, pudiendo el servicio técnico darle el uso que crea pertinente sin necesidad de informar
                  al cliente (Art. 1947 del Código Procesal Civil y Comercial).
                </li>
                <li>
                  El cliente libera de toda responsabilidad a la empresa de cualquier tipo de falla, en equipos que son
                  recepcionados sin encender o no se encuentren operativos, o estén mojados, ya sea porque están sin
                  carga o porque tiene algún problema de software o hardware. En la orden de servicio se dejará
                  constancia en las condiciones que ingresa el equipo a nuestros centros de reparación.
                </li>
                <li>
                  Este servicio técnico garantiza total confidencialidad sobre los datos y/o archivos sensibles
                  (contraseñas web, claves bancarias, etc) que puedan encontrarse dentro de los equipos puestos a su
                  disposición.
                </li>
                <li>
                  Todo costo ocasionado por el traslado del equipo, será a cargo del cliente. En casos de traslado, para
                  que tenga validez, estará sujeto a la firma de conformidad y recepción del servicio técnico. 13. Dejar
                  el equipo en reparación SIGNIFICA ACEPTAR TODAS LAS CONDICIONES DE TRABAJO ANTES DESCRIPTAS.
                </li>
              </ol>
            </section>
          </main>
          <footer className="footer-pdf">
            <h3>DATOS DEL SERVICIO TÉCNICO y FIRMA</h3>
            <section className="firmas">
              <div className="firma-content">
                <p>Firma del cliente : ..................</p>
                <p>Aclaracion : ................</p>
                <p>DNI : ................... ................</p>
              </div>
            </section>
            {/* <div className="fecha-entrega">
              <h3>
                <span>Entrega Equipo </span>
                <span>Fecha ....... </span>
              </h3>

              <p>Firma de Conformidad : ...................</p>
            </div> */}
          </footer>
        </div>
      </PDFExport>
    </div>
  );
};
export default OrderWork;
