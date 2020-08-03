import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditAvatar from './EditAvatar';
import EditProfilePopup from './EditProfilePopup';
import AddCards from './AddCards';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import '../index.css';

function App() {
  const [isEditAvatarOpen, setEditAvatarOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddCardsOpen, setAddCardsOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [dataImage, setDataImage] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const setImage = (card) => {
    setDataImage(card);
    handleCardClick();
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  };
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  };
  function handleAddPlaceClick() {
    setAddCardsOpen(true);
  };
  function handleCardClick() {
    setSelectedCard(true);
  };
  function closeAllPopups() {
    setEditAvatarOpen(false)
    setEditProfilePopupOpen(false)
    setAddCardsOpen(false)
    setSelectedCard(false)
    setDataImage({})
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.like(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((i) => i._id === card._id ? newCard : i);
      setCards(newCards);
    });
    api.dislike(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((i) => i._id === card._id ? newCard : i);
      setCards(newCards);
    });
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((i) => i._id !== card._id);
      setCards(newCards);
    });
  }
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  function handleUpdateUser() {
    api.updateInfo(currentUser.name, currentUser.about)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <PopupWithForm name="editAvatar" title="Обновить аватар" children={<EditAvatar />} isOpen={isEditAvatarOpen} onClose={closeAllPopups} submitText="Сохранить" />
        <PopupWithForm name="addPlace" title="Новое место" children={<AddCards />} isOpen={isAddCardsOpen} onClose={closeAllPopups} submitText="Создать" />
        <PopupWithForm name="popupConfirm" title="Вы уверены?" submitText="Да" />
        <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={dataImage}/>
        <div className="page">
          <Header />
          <main className="content">
            <Main onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddCards={handleAddPlaceClick}
            clickImages={setImage}
            />
            <div className="cards">
              {cards && cards.map((card) => (
                <Card key={card._id} card={card} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
              ))}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
