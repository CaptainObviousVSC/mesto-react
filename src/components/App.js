import React from 'react';
import '../index.css';
import Header from './Header'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import Footer from './Footer'
import CurrentUserContext from '../contexts/CurrentUserContext'
import api from '../utils/api';
import EditProfilePopup from './EditeProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditeAvatarPopup'
function App() {
    const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false)
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([])
    function handleConfirmDeleteClick() {
      setIsConfirmPopupOpen(true)
    }
    function handleCardLike(cardId) {
      api.likeCard(cardId).then((newCard) => {
        const newCards = cards.map((item) => item._id === cardId ? newCard : item)
        setCards(newCards);
      });
    }
    function handleAddPlaceClick(item) {
      api.createCard(item).then((item) => {
        setCards([item, ...cards])
      })
    }
    function handleCardDislike(cardId) {
      api.DislikeCard(cardId).then((newCard) => {
        const newCards = cards.map((item) => item._id === cardId ? newCard : item)
        setCards(newCards);
      });
    }
    function handleCardDelete(cardId) {
      api.deleteCard(cardId).then(() => {
        const newCards = cards.filter(item => item._id !== cardId)
        setCards(newCards);
      });
    }
    function handleUpdateUser({name, about}) {
      api.editeInformation({name, about}).then(({name, about}) => {
        setCurrentUser({name, about})
      })
    }
    function handleUpdateAvatar(avatar) {
      api.editAvatar(avatar).then((avatar) => {
setCurrentUser(avatar)
      })
    }
     function closePopups() {
      setIsProfilePopupOpen(false)
      setIsAddPopupOpen(false)
      setIsAvatarPopupOpen(false)
      setIsConfirmPopupOpen(false)
      setSelectedCard(false)
    }
    function handleEditProfileClick() {
      setIsProfilePopupOpen(true)
    }
    function handleAddCardClick() {
      setIsAddPopupOpen(true)
    }
    function handleEditAvatarClick() {
      setIsAvatarPopupOpen(true)
    }
    function handleCardClick(card) {
      setSelectedCard(card)
    }
  return (
    <CurrentUserContext.Provider value={currentUser} >
    <div className="page">
     <Header />
     <Main 
     onEditProfile = {handleEditProfileClick}
     onEditAvatar = {handleEditAvatarClick}
     onAddPlace = {handleAddCardClick}
     onConfirmDelete = {handleConfirmDeleteClick}
     onCardClick = {handleCardClick}
     onCardDelete = {handleCardDelete}
     onCardLike = {handleCardLike}
     onCardDislike = {handleCardDislike}
     cardsMap = {cards}
     setingCards = {setCards}
     onCurrentUser = {setCurrentUser}
     editProfileIsOpen = {isProfilePopupOpen}
     addCardIsOpen = {isAddPlacePopupOpen}
     editAvatarIsOpen = {isEditAvatarPopupOpen}
     confirmDeleteIsOpen = {isConfirmPopupOpen}
     />
      <ImagePopup card={selectedCard} onClose ={closePopups} />
    <EditProfilePopup
    isOpen={isProfilePopupOpen}
    onClose={closePopups}
    onUpdateUser={handleUpdateUser}
     />
      <AddPlacePopup 
      isOpen={isAddPlacePopupOpen}
      onClose={closePopups}
      onAddPlace={handleAddPlaceClick}
      /> 
     <EditAvatarPopup
    isOpen={isEditAvatarPopupOpen}
    onClose={closePopups}
    onUpdateAvatar={handleUpdateAvatar}
    />
     <PopupWithForm name="popup_confirm" isOpen = {isConfirmPopupOpen} title = "Вы уверены?"
     children = {
       <> 
       </>
     }
     onClose = {closePopups} />
     <Footer/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
