import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();
  const [avatar, setAvatar] = React.useState('');
  
  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  return (
    <PopupWithForm name="editAvatar" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title="Обновить аватар" submitText="Сохранить" children={ 
    <input type="url" ref={avatarRef} value={avatar} onChange={handleAvatarChange} placeholder="Ссылка на картинку" required className="popup__text popup__text_type_activity popup__text_type_avatar" id="link-input" name="link" />
  } />);
}
  
export default EditAvatarPopup;