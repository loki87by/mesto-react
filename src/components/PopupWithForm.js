import React from 'react';

function PopupWithForm(props) {
  return (
    <section className={`popup ${props.isOpen && "popup_opened"}`} id={props.name}>
      <form className="popup__container" name={props.name} method="POST" action="#" id="form2">
        <button className="popup__close" type="reset" aria-label="Закрыть" onClick={props.onClose} id="closeAdds"></button>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__button popup__button_type_save">{props.submitText}</button>
      </form>
    </section>
  );
}
  
export default PopupWithForm;