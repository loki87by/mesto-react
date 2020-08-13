import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import FormValidator from '../utils/FormValidator';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault()
    props.onLoad()
    props.onUpdateUser({
      name: name, about: description
    })
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="editProfile" title="Редактировать профиль" onLoad={props.onLoad} submitText={props.isLoading} children={
      <>
      <input type="text" value={name || ''} onChange={handleNameChange} required className="popup__text popup__text_type_name" id="name-input" name="name" pattern="[A-Za-zА-Яа-яЁё -]*" minLength="2" maxLength="40"/>
      <input type="text" value={description || ''} onChange={handleDescriptionChange} required className="popup__text popup__text_type_activity" id="activity-input" name="link" minLength="2" maxLength="200"/>
      </>}
    />
  );
}

export default EditProfilePopup