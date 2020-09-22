import React from 'react';
import Card from './Card'
import api from '../utils/api'
function Main({onCardClick, onEditAvatar, onEditProfile, onAddPlace}) {
    const [userName, setUserName] = React.useState()
    const [userDescription, setUserDescription] = React.useState()
    const [userAvatar, setUserAvatar] = React.useState()
    const [cards, setCards] = React.useState([])
    React.useEffect(() => {
        api.getInformation().then((data) => {
            setUserName(data.name)
            setUserDescription(data.about) 
            setUserAvatar(data.avatar)
        }).catch(err => console.error(err))
    }, [])
    React.useEffect(()=> {
        api.getCards().then((data) => {
           setCards(data)
        }).catch(err => console.error(err))
    }, [])
return (
<main>
<section className="profile">
    <div className="profile__box">
        <button className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}></button>
        <div className="profile__info">
            <button className="profile__edit" onClick={onEditProfile}></button>
            <div className="profile__container">
                <h1 className="profile__name">{userName}</h1>
                <p className="profile__description">{userDescription}</p>
            </div>
        </div>
    </div>
    <button className="profile__add" onClick={onAddPlace}></button>
</section>
<ul className="elements">
{cards.map((card, i) => <Card key={i} card={card} onCardClick={onCardClick} />)}
</ul>
    </main>
);
}
export default Main;