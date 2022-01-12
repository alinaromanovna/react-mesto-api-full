import React from 'react';

function ImagePopup(props) {
    return (
            <div className={`popup popup-open-foto ${props.isOpen ? 'popup_opened' : ''}`}>
                <figure className="popup-open-foto__figure">
                    <img src={props.card.link} className="popup-open-foto__img" alt={props.card.name} />
                    <figcaption className="popup-open-foto__figcaption">{props.card.name}</figcaption>
                    <button className="popup__close-button" type="reset" onClick={props.onClose}></button>
                </figure>
            </div>
    );
}

export default ImagePopup;