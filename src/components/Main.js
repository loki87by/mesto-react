import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className="profile">
      <div className="profile__info">
        <img className="profile__photo" src={currentUser.avatar} alt="аватар" />
        <div className="profile__photo profile__photo_change" onClick={props.onEditAvatar}></div>
        <h1 className="profile__title">{currentUser.name}</h1>
        <button className="profile__button profile__button_type_edit" type="button" onClick={props.onEditProfile}></button>
        <p className="profile__subtitle">{currentUser.about}</p>
      </div>
      <button className="profile__button profile__button_type_add" type="button" onClick={props.onAddCards}></button>
    </div>
  );
}
  
export default Main;