function HideAlert() {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
}
