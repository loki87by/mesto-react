import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {
  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit()
  }

  return (
    <PopupWithForm name="popupConfirm" title="Вы уверены?" submitText="Да" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} />);
}
  
export default ConfirmPopup;