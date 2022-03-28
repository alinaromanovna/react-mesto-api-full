import React from 'react';
import deleteBtn from '../images/delete.svg';
import { CurrentUserContext } from '../contexts/CurrentUser/CurrentUserContext';



function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `${isOwn ? '' : 'card__button_type_delete_hidden'}`
      );
    console.log(props.card);
    const isLiked = props.card.likes.some(id => id === currentUser._id);
    const cardLikeButtonClassName = (`${isLiked ? 'card__button-img_type-like-active' : 'card__button-img_type-like'}`);


    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleCardLike() {
        props.onCardLike(props.card);
    }
    function handleCardDelete() {
        props.onCardDelete(props.card)
    }

    return (
        <li className="card">
            <img src={props.card.link} className="card__img" alt={props.card.name} onClick={handleClick} />
            <button className={`card__button card__button_type_delete ${cardDeleteButtonClassName}`} type="button" onClick={handleCardDelete}><img className="card__button-img card__button-img_type-delete" src={deleteBtn} alt="Удалить" /></button>
            <div className="card__footer">
                <h2 className="card__sign">{props.card.name}</h2>
                <div className="like-container">
                    <button className="card__button card__button_type_like" type="button" onClick={handleCardLike}><div className={`card__button-img ${cardLikeButtonClassName}`}>
                    </div></button>
                    <span className="counter-like">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;