import success from '../images/successEntered.png';
import fail from '../images/failEntered.png';

function InfoToolTip(props) {
    return(
        <div className={`popup popup_type_infoTool ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container-infotool">
                <button className="popup__close-button" type="reset" onClick={props.onClose}></button>
                <img className="popup__img" src={`${props.isAutorized ? success : fail}`} />
                <p className="popup__sign">{`${props.isAutorized ? 'Вы успешно зарегестрировались' : 'Что-то пошло не так! Попробуйте еще раз.'}`}</p>
            </div>
        </div>
    )
}
export default InfoToolTip;