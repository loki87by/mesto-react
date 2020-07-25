import React from 'react';

function EditProfile() {
  return (
    <>
    <input type="text" placeholder="Имя" required className="popup__text popup__text_type_name" id="name-input" name="name" pattern="[A-Za-zА-Яа-яЁё -]*" minLength="2" maxLength="40"/>
    <input type="text" placeholder="О себе" required className="popup__text popup__text_type_activity" id="activity-input" name="link" minLength="2" maxLength="200"/>
    </>
  );
}
  
export default EditProfile;