import React from 'react'
function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  } 
  return (
  <li className="element">
      <button className="element__remove" onClick= {props.onConfirmDelete}></button>
      <img className="element__img" src={props.card && props.card.link} alt={props.card && props.card.name} onClick = {handleClick}/>
      <div className="element__textbox">
          <h2 className="element__title">{props.card && props.card.name}</h2>
          <div className="element__likes">
  <button type="button" className="element__like"></button>
          <p className="element__counter">{props.card.likes.length}</p>
      </div>
      </div>
  </li>
  )
}
 export default Card