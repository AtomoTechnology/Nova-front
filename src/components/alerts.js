const hideAlert = () => {
  const el = document.querySelector('.alert-success-error');
  if (el) el.remove();
};

export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div   class="flex justify-between items-center gap-4 jhm-shadow w-fit alert alert-success-error alert--${type}">
    <span>   ${msg}  </span>  
    </div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  // <span onclick="HideAlert()" class="text-white flex items-center justify-center cursor-pointer hover:bg-gray-600 w-8 h-8 rounded-full shadow-lg bg-gray-700">
  // </span>
  // <i class="fas fa-times"></i>

  setInterval(() => {
    hideAlert();
  }, 5000);
};
