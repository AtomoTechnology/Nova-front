// import axios from 'axios';
// import { saveAs } from 'file-saver';
// import { fetchWithToken } from './fetchWithOutToken';

// export const generateOrderPdf = async (workId, order) => {
//   const tok = localStorage.getItem('token') || '';
//   const token = 'Bearer ' + tok;
//   const gen = await fetchWithToken(`works/generateOrder/${workId}`, {}, 'POST');
//   console.log(gen.body);
//   const res = await fetch(`${process.env.REACT_APP_URL}works/download/Order`, {
//     responseType: 'blob',
//     headers: {
//       authorization: token,
//     },
//   });

//   console.log(res.body);
//   const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
//   saveAs(pdfBlob, `${order}.pdf`);

//   // axios
//   //   .post(`${process.env.REACT_APP_URL}works/generateOrder/${workId}`, {
//   //     Headers: {
//   //       authorization: token,
//   //     },
//   //   })
//   //   .then(() =>
//   //     axios.get(`${process.env.REACT_APP_URL}works/download/Order`, {
//   //       responseType: 'blob',
//   //       Headers: {
//   //         authorization: token,
//   //       },
//   //     })
//   //   )
//   //   .then((res) => {
//   //     const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
//   //     saveAs(pdfBlob, `${order}.pdf`);
//   //     // setLoading(false);
//   //   });
// };
