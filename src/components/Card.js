import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  function handleClick() {
    props.onCardClick(props.card)
  }
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в стиль для кнопки удаления
  const cardDeleteButtonVisible = (
    isOwn ? {display: 'block'} : {display: 'none'}
  );
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `card__like ${isLiked ? 'card__like_type_active' : ''}`
  );
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <template id="card" className="card">
      <button className="card__delete" style={cardDeleteButtonVisible} onClick={handleDeleteClick} type="reset" aria-label="Удалить"></button>
      <img className="card__image" onClick={handleClick} src={props.card.link} alt={props.card.name} />
      <div className="card__bottom">
        <h2 className="card__title">{props.card.name}</h2>
        <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Мне нравится"></button>
        <h3 className="card__counter">{props.card.likes.length}</h3>
      </div>
    </template>
  );
}
  
export default Card;