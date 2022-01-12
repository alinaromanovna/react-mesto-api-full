import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
        

      } 

    return(
        <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
                <input className="form__input form__input_type_link form__input_type_error" id="avatar-input" type="url" name="link" placeholder="Ссылка на картинку" required ref={avatarRef}/>
                <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
    )

}

export default EditAvatarPopup;