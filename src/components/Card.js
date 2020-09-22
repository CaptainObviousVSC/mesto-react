import React from 'react'
function Card({card, onCardClick, onConfirmDelete}) {
  function handleClick() {
    onCardClick(card);
  } 
  return (
  <li className="element">
      <button className="element__remove" onClick= {onConfirmDelete}></button>
      <img className="element__img" src={card && card.link} alt={card && card.name} onClick = {handleClick}/>
      <div className="element__textbox">
          <h2 className="element__title">{card && card.name}</h2>
          <div className="element__likes">
  <button type="button" className="element__like"></button>
          <p className="element__counter">{card.likes.length}</p>
      </div>
      </div>
  </li>
  )
}
 export default Card