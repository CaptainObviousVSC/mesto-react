import React from 'react'
function ImagePopup({onClose, card}) {
    return (
    <section className={card ? `popup popup_photo popup_opened` : `popup popup_photo`}>
    <div className="popup__box">
    <button className="popup__close" onClick={onClose}></button>
    <p className="popup__box-title">{card.name}</p>
        <img className="popup__img" src={card.link} 
            alt={card.name} />
    </div>
</section>
    )
}
export default ImagePopup