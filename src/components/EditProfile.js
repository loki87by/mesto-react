import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfile() {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  //const [value, setValue] = React.useState({name: "Имя", description: "О себе"});

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name: name, about: description
    })
  }

  function handleChange(e) {
    setName(e.target.name.value);
    setDescription(e.target.name.value);
  }
  /*function handleNameChange() {
    setName(e.target.value);
  }

  function handleDescriptionChange() {
    setDescription(e.target.value);
  }*/
  return (
    <>
    <input type="text" value={name} onChange={handleChange} required className="popup__text popup__text_type_name" id="name-input" name="name" pattern="[A-Za-zА-Яа-яЁё -]*" minLength="2" maxLength="40"/>
    <input type="text" value={description} onChange={handleChange} required className="popup__text popup__text_type_activity" id="activity-input" name="description" minLength="2" maxLength="200"/>
    </>
  );
}
  
export default EditProfile;