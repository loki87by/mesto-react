import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
    function handleClick() {
        props.onCardClick(props.card)
    }
    // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonVisible = (
    isOwn ? {display: 'block'} : {display: 'none'}
  );
  
  return (
    <template id="card" className="card">
      <button className="card__delete" style={cardDeleteButtonVisible} type="reset" aria-label="Удалить"></button>
      <img className="card__image" onClick={handleClick} src={props.card.link} alt={props.card.name} />
      <div className="card__bottom">
        <h2 className="card__title">{props.card.name}</h2>
        <button className="card__like" type="button" aria-label="Мне нравится"></button>
        <h3 className="card__counter">{props.card.likes.length}</h3>
      </div>
    </template>
  );
}
  
export default Card;