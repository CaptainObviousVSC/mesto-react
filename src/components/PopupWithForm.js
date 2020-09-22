import React from 'react'
function PopupWithForm({name, isOpen, title, handler, onClose, children}) {
    return (
        <>
<section className={isOpen ? `popup ${name} popup_opened` : `popup ${name}`}>
        <div className="popup__container">
            <h2 className="popup__title">{title}</h2>
            <form className="popup__form" noValidate> 
                   {children}
                <button className="popup__save" onClick={handler}>Сохранить</button>
            </form>
            <button className="popup__close" onClick={onClose}></button>
        </div>
    </section>
</>
    )
}
export default PopupWithForm