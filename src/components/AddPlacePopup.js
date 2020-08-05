import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function AddPlacePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const placeTitle = React.useRef();
  const [link, setLink] = React.useState('');
  
  React.useEffect(() => {
    setLink(currentUser.link);
  }, [currentUser]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault()
    props.onUpdatePlace({
      name: placeTitle.current.value,
      link: link
    })
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  return (
    <PopupWithForm name="addPlace" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit} submitText="Создать" children={
      <>
        <input type="text" ref={placeTitle} defaultValue={''} placeholder="Название" required className="popup__text popup__text_type_name" id="place-input" name="name" minLength="1" maxLength="30"/>
        <input type="url" value={link || ''} onChange={handleLinkChange} placeholder="Ссылка на картинку" required className="popup__text popup__text_type_activity" id="link-input" name="link" />
      </>}
    />
  );
}
  
export default AddPlacePopup;