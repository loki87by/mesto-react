import React from 'react';

function AddCards() {
  return (
    <>
    <input type="text" placeholder="Название" required className="popup__text popup__text_type_name" id="place-input" name="name" minLength="1" maxLength="30"/>
    <input type="url" placeholder="Ссылка на картинку" required className="popup__text popup__text_type_activity" id="link-input" name="link" />
    </>
  );
}
  
export default AddCards;