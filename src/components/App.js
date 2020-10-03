import React from 'react';
import '../index.css';
import Header from './Header'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import Footer from './Footer'
import CurrentUserContext from '../contexts/CurrentUserContext'
import api from '../utils/api';
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
      console.log(cardId)
      api.likeCard(cardId).then((newCard) => {
        console.log(cardId)
        const newCards = cards.map((item) => item._id === cardId ? newCard : item)
        setCards(newCards);
      });
    }
    function handleCardDelete(card) {
      api.deleteCard(card._id).then(() => {
        const newCards = cards.filter(item => item._id !== card._id)
        setCards(newCards);
      });
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
     onAddPlace = {handleAddCardClick}
     onEditAvatar = {handleEditAvatarClick}
     onConfirmDelete = {handleConfirmDeleteClick}
     onCardClick = {handleCardClick}
     onCardDelete = {handleCardDelete}
     onCardLike = {handleCardLike}
     cardsMap = {cards}
     setingCards = {setCards}
     onCurrentUser = {setCurrentUser}
     editProfileIsOpen = {isProfilePopupOpen}
     addCardIsOpen = {isAddPlacePopupOpen}
     editAvatarIsOpen = {isEditAvatarPopupOpen}
     confirmDeleteIsOpen = {isConfirmPopupOpen}
     />
      <ImagePopup card={selectedCard} onClose ={closePopups} />
     <PopupWithForm name="popup_edite" isOpen = {isProfilePopupOpen} title = "Редактировать профиль" 
     children = {
       <> 
       <input type="text" name="name" className="popup__input popup__input_value-name" 
                        placeholder="Имя Фамилия" required minLength="2" maxLength="40" />
                    <span className="popup__error" id="name-error"></span>
                    <input type="text" name="about" className="popup__input popup__input_value-description"
                        placeholder="Описание" required minLength="2" maxLength="200" />
                    <span className="popup__error" id="about-error"></span>
       </>
     }
     onClose = {closePopups} />
     <PopupWithForm name="popup_add" isOpen = {isAddPlacePopupOpen} title= "Новое Место"
     children = {
       <> 
        <input type="text" name="place" className="popup__input popup__input_value-place" placeholder="Название"
                 required minLength="1" maxLength="30" />
             <span className="popup__error" id="place-error"></span>
             <input type="url" name="link" className="popup__input popup__input_value-link"
                 placeholder="Ссылка на картинку" required />
             <span className="popup__error" id="link-error"></span> 
       </>
     }
     onClose = {closePopups} />
     <PopupWithForm name="popup_avatar" isOpen = {isEditAvatarPopupOpen} title = "Обновить аватар"
     children = {
       <> 
         <input type="url" name="avatar" className="popup__input popup__input_value-avatar"
                     placeholder="Ссылка на аватар" required />
                     <span className="popup__error" id="avatar-error"></span> 
       </>
     }
     onClose = {closePopups} />
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
