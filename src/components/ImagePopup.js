import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`} id="popupCard">
      <figure className="popup__image-container">
        <button className="popup__close popup__close_image" type="reset" aria-label="Закрыть" id="cardClose" onClick={props.onClose}></button>
        <img src={props.card.link} className="popup__image" alt={props.card.name} />
        <figcaption className="popup__image-title">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}
  
export default ImagePopup;