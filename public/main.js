// alert('hello');
// await loadScript('main.js');
// const b = document.querySelector('#banner-content-imgs');
// console.log('hereeee...', b);
function HideAlert() {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
}
