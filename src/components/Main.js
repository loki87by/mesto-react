import React from 'react';
import avatar from '../images/kusto.jpg'
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [isName, setName] = React.useState('Жак-Ив Кусто');
  const [isDescription, setDescription] = React.useState('Исследователь океана');
  const [isAvatar, setAvatar] = React.useState(avatar);
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    function userInfo(user) {
      setAvatar(user.avatar);
      setName(user.name);
      setDescription(user.about);
    }
    
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      userInfo(user, cards);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <main className="content">
      <div className="profile">
        <div className="profile__info">
          <img className="profile__photo" src={isAvatar} alt="аватар" />
          <div className="profile__photo profile__photo_change" onClick={props.onEditAvatar}></div>
          <h1 className="profile__title">{isName}</h1>
          <button className="profile__button profile__button_type_edit" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__subtitle">{isDescription}</p>
        </div>
        <button className="profile__button profile__button_type_add" type="button" onClick={props.onAddCards}></button>
      </div>
        <div className="cards">
          {cards && cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.clickImages}/>
          ))}
        </div>
    </main>
  );
}
  
export default Main;