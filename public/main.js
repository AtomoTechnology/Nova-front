function HideAlert() {
  const el = document.querySelector('.alert-success-error');
  if (el) el.parentElement.removeChild(el);
}
