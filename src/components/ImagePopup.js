import React from 'react'
function ImagePopup({onClose, card, name}) {
    <section className={`popup popup_photo ${name}`}>
    <div className="popup__box">
        <button className="popup__close" onClick={onClose}></button>
        <p className="popup__box-title"></p>
        <img className="popup__img" src={card.selectedCard} 
            alt="" />
    </div>
</section>
}
export default ImagePopup