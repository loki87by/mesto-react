import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card)
    }
  return (
    <template id="card" className="card">
      <button className="card__delete" type="reset" aria-label="Удалить"></button>
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