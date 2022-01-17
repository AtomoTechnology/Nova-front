import React from 'react';

export const SmallLoading = ({ text = 'Cargando...', size = 'big' }) => {
  return (
    <div class={`spinner spinner-` + size}>
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
      <span>{text}</span>
    </div>
  );
};
