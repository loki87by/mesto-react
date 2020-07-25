import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditAvatar from './EditAvatar';
import EditProfile from './EditProfile';
import AddCards from './AddCards';
import ImagePopup from './ImagePopup';
import '../index.css';

function App() {
  const [isEditAvatarOpen, setEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = React.useState(false);
  const [isAddCardsOpen, setAddCardsOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [dataImage, setDataImage] = React.useState({});
  const setImage = (card) => {
    setDataImage(card);
    handleCardClick();
  }
  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  };
  function handleEditProfileClick() {
    setEditProfileOpen(true)
  };
  function handleAddPlaceClick() {
    setAddCardsOpen(true);
  };
  function handleCardClick() {
    setSelectedCard(true);
  };
  function closeAllPopups() {
    setEditAvatarOpen(false)
    setEditProfileOpen(false)
    setAddCardsOpen(false)
    setSelectedCard(false)
    setDataImage({})
  }
  return (
    <div className="root">
      <PopupWithForm name="editAvatar" title="Обновить аватар" children={<EditAvatar />} isOpen={isEditAvatarOpen} onClose={closeAllPopups} submitText="Сохранить" />
      <PopupWithForm name="editProfile" title="Редактировать профиль" children={<EditProfile />} isOpen={isEditProfileOpen} onClose={closeAllPopups} submitText="Сохранить" />
      <PopupWithForm name="addPlace" title="Новое место" children={<AddCards />} isOpen={isAddCardsOpen} onClose={closeAllPopups} submitText="Создать" />
      <PopupWithForm name="popupConfirm" title="Вы уверены?" submitText="Да" />
      <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={dataImage}/>
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddCards={handleAddPlaceClick}
        clickImages={setImage}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
