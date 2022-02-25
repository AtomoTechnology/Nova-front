const hideAlert = () => {
  const el = document.querySelector('.alert-success-error');
  // if (el) el.parentElement.removeChild(el);
  if (el) el.remove();
};

export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div   class="flex justify-between items-center gap-4 jhm-shadow w-fit alert alert-success-error alert--${type}">
    <span>   ${msg}  </span>  
    <span onclick="HideAlert()" class="text-white flex items-center justify-center cursor-pointer hover:bg-gray-600 w-8 h-8 rounded-full shadow-lg bg-gray-700"> 
    <i class="fas fa-times"></i>
    </span>
  </div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  // window.setTimeout(hideAlert, 5000);
};

export const ShowModal = (title, content, action) => {
  let modal = document.createElement('div');
  modal.innerHTML = `
  <div class="model model-delete-query flex justify-between  items-center flex-col  z-50 absolute top-1/2 left-1/2 bg-gray-100 rounded shadow">
  <div class="p-2 text-center text-white w-full bg-gray-900">${title}</div>

    <div class="p-1 my-2 w-5/6">
      ${content}
    </div>

    <div class=" flex p-1 w-5/6  justify-between items-center  ">
      <button class="btn-delete-query btn jhm-shadow !w-fit" onclick=" ${() => deleteQuery}" >Si </button>
      <button class="btn jhm-shadow !w-fit !bg-gray-700"  onclick="${action.close}" >Cancelar</button>
    </div>
  
  </div>
  
  `;

  document.querySelector('body').appendChild(modal);
  // window.setTimeout(hideAlert, 5000);
};

function deleteQuery() {
  document.querySelector('.btn-delete-query').style.display = 'none';
}
